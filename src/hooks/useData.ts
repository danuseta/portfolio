import { useState, useEffect } from 'react';

interface UseDataOptions {
  onError?: (error: Error) => void;
}

export function useData<T>(fetchFn: () => Promise<T>, options: UseDataOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        setData(result);
        setError(null);
      } catch (e) {
        const error = e instanceof Error ? e : new Error('An error occurred');
        setError(error);
        options.onError?.(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchFn]);

  return { data, loading, error };
}
