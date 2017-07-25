import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login';
import { loginUser } from './actions';
import { loadUserPage } from '../redux/actions';
import Button from 'react-toolbox/lib/button/Button';


export function loginRequired(level) {
  return function(PageComponent) {
    class SecurePageWrapper extends Component {

      render() {
        const { isAuthenticated, errorMessage } = this.props.auth;
        const { dispatch } = this.props;

        // TODO: Also check level
        if (!isAuthenticated) {
          // TODO: Tell react router redirect to login page
          // TODO: Somehow inform the server to fire off a 401, 403, etc
          return (
            <div>
              <h1>Authentication Required</h1>

              <Button onClick={() => this.props.loadUserPage('blainegarrett')} primary raised>ASDF</Button>


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
      //throw new NotAuthorizedException('derp');
      return { auth: state.auth, login: 'blaineface'};
    }

  function authMapDispatchToProps(dispatch) {
    return {
      dispatch:dispatch,
      loadUserPage: bindActionCreators(loadUserPage, dispatch) // bindActionCreators !!!!
    }
  }

    return connect(authMapStateToProps, authMapDispatchToProps)(SecurePageWrapper)
  }
}