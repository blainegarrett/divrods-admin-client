import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './Login';
import { loginUser } from './actions';
import Snackbar from 'react-toolbox/lib/snackbar/Snackbar';

export function loginRequired(level) {
  return function(PageComponent) {
    class SecurePageWrapper extends Component {

      render() {
        const { isAuthenticated, errorMessage } = this.props.auth;
        const { dispatch } = this.props;
        const { sessionTimedOut } =  this.props;

        const showLogin = sessionTimedOut || !isAuthenticated;

        // TODO: Also check level
        if (showLogin) {
          // TODO: Tell react router redirect to login page
          // TODO: Somehow inform the server to fire off a 401, 403, etc
          return (
            <div>
              <h1>Authentication Required</h1>

              <Login
                errorMessage={errorMessage}
                onLoginClick={ creds => dispatch(loginUser(creds)) }
              />

            <Snackbar
              label='Your Session has expired. Please login again.'
              ref='snackbar'
              type='warning'
              active={sessionTimedOut}
            />

            </div>);
        }
        return (<PageComponent {...this.props} />);
      }
    }
    SecurePageWrapper.propTypes = {
      auth: PropTypes.object,
      isAuthenticated: PropTypes.bool,
      dispatch: PropTypes.func
    }

    function authMapStateToProps(state) {
      const sessionTimedOut = (state.globalErrorMessage === 'Authentication Failed');
      return { auth: state.auth, sessionTimedOut: sessionTimedOut};
    }

  function authMapDispatchToProps(dispatch) {
    return {
      dispatch:dispatch,
    }
  }

    return connect(authMapStateToProps, authMapDispatchToProps)(SecurePageWrapper)
  }
}