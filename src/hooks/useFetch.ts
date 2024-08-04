import { useState, useCallback, useRef, useEffect } from 'react';

interface FetchState<T> {
  data: T | null | undefined;
  isLoading: boolean;
  error: Error | null;
}

interface CacheItem<T> {
  data: T | undefined;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useFetch<T>(cacheKey?: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const cache = useRef<Record<string, CacheItem<T>>>({});

  useEffect(() => {
    if (cacheKey) {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setState({ data, isLoading: false, error: null });
          cache.current[cacheKey] = { data, timestamp };
        }
      }
    }
  }, [cacheKey]);

  const execute = useCallback(
    async (promise: Promise<T | undefined>, forceRefresh = false) => {
      if (cacheKey && !forceRefresh) {
        const cachedItem = cache.current[cacheKey];
        if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
          setState({ data: cachedItem.data, isLoading: false, error: null });
          return;
        }
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const data = await promise;
        setState({ data, isLoading: false, error: null });
        if (cacheKey) {
          cache.current[cacheKey] = { data, timestamp: Date.now() };
          localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
        }
      } catch (error) {
        setState({ data: null, isLoading: false, error: error as Error });
      }
    },
    [cacheKey],
  );

  return { ...state, execute };
}
