// components/Navbar.js

import React, { Component, PropTypes } from 'react'
import Login from './Login'
import Logout from './Logout'
import { loginUser, logoutUser } from './actions'

export default class NavThing extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-form'>
            {isAuthenticated && <Logout onLogoutClick={() => dispatch(logoutUser())} /> }
          </div>
        </div>
      </nav>
    )
  }

}

NavThing.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}