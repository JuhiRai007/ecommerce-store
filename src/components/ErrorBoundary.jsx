import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Optionally log the error to a service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-700 my-24">
          <h1 className="text-2xl font-bold">Something went wrong.</h1>
          <p>Please refresh or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
