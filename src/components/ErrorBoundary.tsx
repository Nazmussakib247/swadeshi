import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render/runtime errors in the React tree below it and shows a
 * recoverable fallback instead of a blank white screen. Wraps the router so a
 * crash in one page (e.g. a lazily-loaded chunk failing to load) doesn't take
 * down the whole app.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex min-h-screen items-center justify-center bg-muted px-6">
          <div className="text-center max-w-md">
            <h1 className="mb-4 font-display text-3xl font-bold text-foreground">
              Something went wrong
            </h1>
            <p className="mb-6 font-body text-muted-foreground">
              An unexpected error occurred. You can try again, or head back to the
              home page.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="rounded-lg bg-primary px-5 py-2.5 font-body text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Try again
              </button>
              <a
                href="/"
                className="rounded-lg border border-border px-5 py-2.5 font-body text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
