import { useEffect, useCallback } from 'react';

export function useAsyncError() {
  const handleError = useErrorHandler();

  useEffect(() => {
    const listener = (event: ErrorEvent) => {
      handleError(event.error);
    };

    const rejectionListener = (event: PromiseRejectionEvent) => {
      handleError(event.reason);
    };

    window.addEventListener('error', listener);
    window.addEventListener('unhandledrejection', rejectionListener);

    return () => {
      window.removeEventListener('error', listener);
      window.removeEventListener('unhandledrejection', rejectionListener);
    };
  }, [handleError]);
}

export function useErrorHandler() {
  return useCallback((error: Error) => {
    throw error;
  }, []);
}
