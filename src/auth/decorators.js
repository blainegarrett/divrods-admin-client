import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/components/connect';

export function loginRequired(level) {
  return function(PageComponent) {
    class SecurePageWrapper extends Component {
      render() {
        const { is_signed_in } = this.props.authStateStore;

        // TODO: Also check level
        if (!is_signed_in) {
          // TODO: Tell react router redirect to login page
          // TODO: Somehow inform the server to fire off a 401, 403, etc
          return (<div><h1>Unauthorized</h1><p>You do not have access to this page. Please return <a href="/">home</a></p></div>);
        }
        return (<PageComponent {...this.props} />);
      }
    }
    SecurePageWrapper.propTypes = {
      authStateStore: PropTypes.any
    }

    function authMapStateToProps(state) {
      //throw new NotAuthorizedException('derp');
      return { authStateStore: state.authStateStore};
    }

    return connect(authMapStateToProps)(SecurePageWrapper)
  }
}