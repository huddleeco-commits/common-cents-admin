/**
 * useBrain Hook
 * Fetches brain.json configuration from API
 */

import { useState, useEffect } from 'react';

const defaultBrain = {
  business: {
    name: 'My Business',
    tagline: '',
    ownerName: ''
  },
  theme: {
    primaryColor: '#22c55e',
    accentColor: '#3b82f6'
  },
  labels: {
    customers: 'Customers',
    orders: 'Orders',
    items: 'Items',
    revenue: 'Revenue'
  }
};

export function useBrain() {
  const [brain, setBrain] = useState(defaultBrain);
  const [business, setBusiness] = useState(defaultBrain.business);
  const [theme, setTheme] = useState(defaultBrain.theme);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrain = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/brain`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.brain) {
            setBrain(data.brain);
            setBusiness(data.brain.business || defaultBrain.business);
            setTheme(data.brain.theme || defaultBrain.theme);
          }
        } else {
          console.warn('Brain API not available, using defaults');
        }
      } catch (err) {
        console.warn('Could not fetch brain config:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrain();
  }, []);

  const refreshBrain = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/brain`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.brain) {
          setBrain(data.brain);
          setBusiness(data.brain.business || defaultBrain.business);
          setTheme(data.brain.theme || defaultBrain.theme);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    brain,
    business,
    theme,
    loading,
    error,
    refreshBrain
  };
}

export default useBrain;
