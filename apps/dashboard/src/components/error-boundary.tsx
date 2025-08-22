"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error?: Error;
    errorInfo?: React.ErrorInfo;
  }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("React Error Boundary caught an error:", error);
    console.error("Error Info:", errorInfo);
    console.error("Component Stack:", errorInfo.componentStack);

    // Log specific details about React Error #130
    if (error.message.includes("130") || error.message.includes("undefined")) {
      console.error("REACT ERROR #130 DETECTED!");
      console.error(
        "This error occurs when trying to render undefined as a React child",
      );
      console.error("Stack trace:", error.stack);
    }

    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;

      if (this.props.fallback) {
        const Fallback = this.props.fallback;
        return <Fallback error={error} errorInfo={errorInfo} />;
      }

      return (
        <div
          style={{
            padding: "20px",
            border: "2px solid red",
            margin: "20px",
            backgroundColor: "#ffe6e6",
            fontFamily: "monospace",
          }}
        >
          <h1 style={{ color: "red" }}>React Error Detected</h1>
          <h2>Error Message:</h2>
          <pre style={{ backgroundColor: "#fff", padding: "10px" }}>
            {error?.message || "Unknown error"}
          </pre>

          <h2>Error Stack:</h2>
          <pre
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              fontSize: "12px",
            }}
          >
            {error?.stack || "No stack trace"}
          </pre>

          <h2>Component Stack:</h2>
          <pre
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              fontSize: "12px",
            }}
          >
            {errorInfo?.componentStack || "No component stack"}
          </pre>

          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 20px",
              marginTop: "20px",
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reload Page
          </button>

          <button
            onClick={() => (window.location.href = "/auth/signin")}
            style={{
              padding: "10px 20px",
              marginTop: "20px",
              marginLeft: "10px",
              backgroundColor: "#4444ff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Go to Sign In
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
