import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-600 flex justify-center">OOPS!! Something went wrong.</div>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
