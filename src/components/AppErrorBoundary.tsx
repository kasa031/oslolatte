import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AppErrorBoundaryFallback } from './AppErrorBoundaryFallback';

type Props = { children: ReactNode };

type State = { error: Error | null };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN?.trim()) {
      void import('@sentry/react').then((Sentry) => {
        Sentry.captureException(error, { extra: { componentStack: info.componentStack } });
      });
    }
  }

  private handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return <AppErrorBoundaryFallback error={this.state.error} onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
