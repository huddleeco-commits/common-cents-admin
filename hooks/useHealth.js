/**
 * useHealth Hook
 * Real health check against backend API
 */

import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function useHealth() {
  const [health, setHealth] = useState({
    overall: 'unknown',
    api: 'unknown',
    database: 'unknown',
    cache: 'unknown'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isHealthy = health.overall === 'healthy' || health.overall === 'ok';
  const isDegraded = health.overall === 'degraded';
  const isUnhealthy = health.overall === 'unhealthy' || health.overall === 'error';

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
      case 'ok':
        return '✓';
      case 'degraded':
        return '⚠';
      case 'unhealthy':
      case 'error':
        return '✗';
      default:
        return '?';
    }
  };

  const checkHealth = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!API_URL) {
      setHealth({
        overall: 'unknown',
        api: 'not configured',
        database: 'unknown',
        cache: 'unknown'
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/health`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setHealth({
          overall: data.status || 'healthy',
          api: 'healthy',
          database: data.database?.status || 'healthy',
          cache: data.cache?.status || 'healthy',
          timestamp: data.timestamp,
          modules: data.modules
        });
      } else {
        setHealth({
          overall: 'degraded',
          api: 'error',
          database: 'unknown',
          cache: 'unknown'
        });
      }
    } catch (err) {
      console.error('Health check failed:', err);
      setError(err.message);
      setHealth({
        overall: 'unhealthy',
        api: 'unreachable',
        database: 'unknown',
        cache: 'unknown'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Check health on mount
  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return {
    health,
    isHealthy,
    isDegraded,
    isUnhealthy,
    getStatusIcon,
    checkHealth,
    loading,
    error
  };
}

export default useHealth;
