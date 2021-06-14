import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {adminRoute} from "../../../utils";

interface State {
  hasError?: boolean;
}

class ErrorBoundary extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
    console.log('ErrorBoundary - Error Info: ' + errorInfo.componentStack);
    const { history } = this.props;
    this.setState({ hasError: true });
    // history.push({ pathname: adminRoute('/error'), state: { hasError: true } });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
