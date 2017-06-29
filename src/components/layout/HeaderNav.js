import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';

export default class HeaderNav extends Component {
  render() {
    const { title, authState, logoutUser, onLeftIconClick } = this.props;
    const authProps = {}
    if (authState.isAuthenticated) {
        authProps.rightIcon = 'exit_to_app';
        authProps.onRightIconClick = logoutUser;
    }

    return (
      <AppBar fixed title={ (<b>{title}</b>)}
              leftIcon='menu' onLeftIconClick={ onLeftIconClick }
              { ...authProps }
        />
    );
  }
}

HeaderNav.propTypes = {
  onLeftIconClick: PropTypes.func,
  title: PropTypes.string,
  authState: PropTypes.object,
  logoutUser: PropTypes.func
};