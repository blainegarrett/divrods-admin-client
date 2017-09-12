import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './Login';
import { loginUser } from './actions';
import styles from './Login.css';

export function loginRequired(level) {
  return function(PageComponent) {
    class SecurePageWrapper extends Component {

      render() {
        const { isAuthenticated, errorMessage } = this.props.auth;
        const { dispatch } = this.props;

        const showLogin = !isAuthenticated;

        console.log(styles.good);

        // TODO: Also check level
        if (showLogin) {
          // TODO: Tell react router redirect to login page
          // TODO: Somehow inform the server to fire off a 401, 403, etc
          return (
            <div>
              <h1 className="good">Authentication Required</h1>

              <Login
                errorMessage={errorMessage}
                onLoginClick={ creds => dispatch(loginUser(creds)) }
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
      return { auth: state.auth};
    }

  function authMapDispatchToProps(dispatch) {
    return {
      dispatch:dispatch,
    }
  }

    return connect(authMapStateToProps, authMapDispatchToProps)(SecurePageWrapper)
  }
}