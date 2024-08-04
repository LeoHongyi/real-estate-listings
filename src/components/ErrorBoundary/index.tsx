import React, { useState, useCallback, ReactNode, ErrorInfo } from 'react';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
  const [error, setError] = useState<Error | null>(null);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error: Error) => {
    console.error('Caught an error:', error);
    setError(error);
  }, []);

  if (error) {
    return fallback ? (
      <>{fallback(error, reset)}</>
    ) : (
      <div className="error-boundary">
        <div className="error-icon">⚠️</div>
        <h1 className="error-title">Oops! Something went wrong.</h1>
        <p className="error-message">
          We're sorry, but an error occurred. Our team has been notified and we're working on a fix.
        </p>
        <details className="error-details">
          <summary>Error Details</summary>
          <pre>{error.toString()}</pre>
        </details>
        <button className="reset-button" onClick={reset}>
          Try Again
        </button>
      </div>
    );
  }

  return <ErrorBoundaryInner onError={handleError}>{children}</ErrorBoundaryInner>;
};

class ErrorBoundaryInner extends React.Component<{
  children: ReactNode;
  onError: (error: Error) => void;
}> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError(error);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
