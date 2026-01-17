/**
 * useApi Hook - Placeholder
 * 
 * Simple mock API hook for demo mode.
 */

import { useState, useEffect } from 'react';

export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [endpoint]);

  const refetch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return { data, loading, error, refetch };
}

export default useApi;
