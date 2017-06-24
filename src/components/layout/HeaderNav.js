// Primary Top Navigation
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { AppBar } from 'react-toolbox/lib/app_bar';

class UserUtilsNav extends Component {
  constructor(props) {
    super(props);
    this.maybeSignOut = this.maybeSignOut.bind(this);
  }

  render() {
    const authState = this.props.authStateStore;
    console.log(authState);

    // Native authentication in progress
    if (authState.loading) {
      return (<li>loading...</li>);
    }

    // Native authentication Complete
    if (authState.is_signed_in) {
      if (!authState.is_member) {
        return (<li> not member ( <a onClick={ this.maybeSignOut } >signout</a>)</li>);
      }
      return (<li>{ authState.profile.username } ( <a onClick={ this.maybeSignOut } >signout</a>)</li>);
    }

    return null;
  }
  maybeSignOut() {
    this.props.signOut();
  }
}
UserUtilsNav.propTypes = {
  // Injected by React Redux
  authStateStore: PropTypes.object,
}

class HeaderNav extends Component {
  render() {
    return (
      <AppBar scrollHide fixed title={ (<b>Divining Rod Admin</b>)} leftIcon='menu' onLeftIconClick={ this.props.handleLayoutToggleClick }>
            <UserUtilsNav
                    authStateStore={this.props.authStateStore}
                    signOut={ this.props.signOut }  />
      </AppBar>);
    /*
    return (
      <div id="header_nav" className="navbar-fixed" role="navigation">
        <div className="navbar-fixed">
          <nav className={ styles.appBar }>
            <Grid fluid={ this.props.is_fluid }>
              <div className="nav-wrapper">
                <a id="side_nav_toggle" className="left" title="Show Menu" onClick={ this.props.handleLayoutToggleClick }><span></span></a>
                <PageLink className="brand-logo hide-on-med-and-down left" data-ga-category="title-link" data-ga-label="tablet-or-desktop" to="/" title="MPLSART.COM Home Page">MPLSART.COM</PageLink>
                <PageLink className="brand-logo center hide-on-large-only" data-ga-category="title-link" data-ga-label="mobile" to="/" title="MPLSART.COM Home Page">MPLSART.COM</PageLink>

                <ul className="right hide-on-med-and-down">
                  <UserUtilsNav
                    authStateStore={this.props.authStateStore}
                    signOut={ this.props.signOut }  />
                </ul>
              </div>
            </Grid>
          </nav>
        </div>
    </div>);
    */
  }
}

HeaderNav.propTypes = {
  // Injected by React Redux
  signOut: PropTypes.func,
  authStateStore: PropTypes.object,
  handleLayoutToggleClick: PropTypes.func,
  is_fluid: PropTypes.bool,
}

export default HeaderNav;