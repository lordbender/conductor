/* eslint-disable no-console */
import React from 'react';

export default class ErrorBoundry extends React.Component {
  state = {
    hasError: false,
    error: {},
    info: {}
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });

    console.error('Error Object =>', error);
    console.error('Error Info Object =>', info);
  }

  render() {
    const { hasError, error, info } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <div>{JSON.stringify(error)}</div>
          <div>{JSON.stringify(info)}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
