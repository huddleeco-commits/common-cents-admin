/**
 * useApi Hook - Real API Implementation
 * 
 * Connects to the actual backend API.
 * API URL is set via VITE_API_URL environment variable.
 */

import { useState, useEffect, useCallback } from 'react';

// API Base URL - uses environment variable (set during build)
const API_URL = import.meta.env.VITE_API_URL || '';

export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!API_URL) {
      setError('API URL not configured');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          throw new Error('Session expired. Please log in again.');
        }
        throw new Error(`API Error: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(options)]);

  useEffect(() => {
    if (options.skip) {
      setLoading(false);
      return;
    }
    fetchData();
  }, [fetchData, options.skip]);

  return { data, loading, error, refetch: fetchData };
}

// Helper for making API calls (POST, PUT, DELETE)
export async function apiCall(endpoint, method = 'GET', body = null) {
  const token = localStorage.getItem('adminToken');
  
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const options = {
    method,
    headers,
  };
  
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, options);
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
      throw new Error('Session expired');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error: ${response.status}`);
  }
  
  return response.json();
}

// Auth-specific API calls
export const authApi = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Login failed' }));
      throw new Error(error.error || 'Invalid credentials');
    }
    
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('adminToken', data.token);
    }
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  },
  
  getProfile: async () => {
    return apiCall('/api/auth/profile');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  }
};

export default useApi;