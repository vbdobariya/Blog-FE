import React, { Component } from 'react';

// Named export instead of anonymous default export
export default function requireAuthAdmin(ComposedComponent) {

  class RequireAuthAdmin extends Component {
    state = {
      authToken: localStorage.getItem('adminauthtoken'),
    }

    componentWillMount() {
      if (!this.state.authToken) {
        this.props.history.push('/admin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!this.state.authToken) {
        this.props.history.push('/admin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  return RequireAuthAdmin;
}
