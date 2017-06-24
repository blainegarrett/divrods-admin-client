import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/components/connect';
import Login from './Login';
import { loginUser, logoutUser } from './actions';

export function loginRequired(level) {
  return function(PageComponent) {
    class SecurePageWrapper extends Component {
      render() {
        const { isAuthenticated, errorMessage } = this.props.xAuthReducer;
        const { dispatch } = this.props;

        // TODO: Also check level
        if (!isAuthenticated) {
          // TODO: Tell react router redirect to login page
          // TODO: Somehow inform the server to fire off a 401, 403, etc
          return (
            <div>
              <h1>Authentication Required</h1>

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
      authStateStore: PropTypes.any
    }

    function authMapStateToProps(state) {
      //throw new NotAuthorizedException('derp');
      return { xAuthReducer: state.xAuthReducer};
    }

  function authMapDispatchToProps(dispatch) {
    return {
      dispatch:dispatch,
    }
  }

    return connect(authMapStateToProps, authMapDispatchToProps)(SecurePageWrapper)
  }
}