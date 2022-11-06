import React, { Component } from 'react';
import './errorBoundary.scss';
import PropTypes from 'prop-types';

// interface ErrorBoundaryProps {
//   children: ReactNode;
// }

// interface ErrorBoundaryState {
//   message: string;
//   hasError: boolean;
// }

// Ref: https://reactjs.org/docs/error-boundaries.html
export default class ErrorBoundary extends Component {
  //   ErrorBoundaryProps,
  //   ErrorBoundaryState
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.warn('ErrorBoundary -> componentDidCatch -> error ->', error);
    console.warn('ErrorBoundary -> componentDidCatch -> errorInfo ->', errorInfo.componentStack);
  }

  render() {
    const { hasError, message } = this.state;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary-wrapper">
          <br />
          <br />
          <h1> Whoops! Something went wrong :( </h1>
          <br />
          <h2>{message}</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
