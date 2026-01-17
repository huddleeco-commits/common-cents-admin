/**
 * ErrorBoundary
 *
 * Catches React rendering errors and displays a fallback UI
 * instead of crashing the entire application.
 */

import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // TODO: Send to error tracking service (Sentry, etc.)
    // if (window.Sentry) {
    //   window.Sentry.captureException(error, { extra: errorInfo });
    // }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.iconWrapper}>
              <AlertTriangle size={48} color="#ef4444" />
            </div>

            <h1 style={styles.title}>Something went wrong</h1>

            <p style={styles.message}>
              We're sorry, but something unexpected happened. This error has been logged
              and we'll look into it.
            </p>

            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={styles.details}>
                <summary style={styles.summary}>
                  <Bug size={16} />
                  Error Details (Development Only)
                </summary>
                <pre style={styles.errorText}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div style={styles.actions}>
              <button onClick={this.handleReset} style={styles.primaryButton}>
                <RefreshCw size={18} />
                Try Again
              </button>

              <button onClick={this.handleReload} style={styles.secondaryButton}>
                <RefreshCw size={18} />
                Reload Page
              </button>

              <button onClick={this.handleGoHome} style={styles.secondaryButton}>
                <Home size={18} />
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: 'var(--color-background, #0a0a0f)'
  },
  card: {
    maxWidth: '500px',
    width: '100%',
    padding: '40px',
    backgroundColor: 'var(--color-surface, #12121a)',
    borderRadius: '16px',
    border: '1px solid var(--color-border, #2a2a3a)',
    textAlign: 'center'
  },
  iconWrapper: {
    width: '80px',
    height: '80px',
    margin: '0 auto 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '50%'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--color-text, #ffffff)',
    margin: '0 0 12px 0'
  },
  message: {
    fontSize: '14px',
    color: 'var(--color-text-muted, #888)',
    lineHeight: 1.6,
    margin: '0 0 24px 0'
  },
  details: {
    marginBottom: '24px',
    textAlign: 'left',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    padding: '12px'
  },
  summary: {
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text-muted, #888)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  errorText: {
    marginTop: '12px',
    padding: '12px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '6px',
    fontSize: '12px',
    color: '#ef4444',
    overflow: 'auto',
    maxHeight: '200px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px 24px',
    backgroundColor: 'var(--color-primary, #6366f1)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  secondaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border, #2a2a3a)',
    borderRadius: '10px',
    color: 'var(--color-text, #ffffff)',
    fontSize: '14px',
    cursor: 'pointer'
  }
};

export default ErrorBoundary;
