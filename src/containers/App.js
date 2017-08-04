import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import Sidebar from 'react-toolbox/lib/layout/Sidebar';

import HeaderNav from '../components/layout/HeaderNav';
import MainMenu from '../components/layout/MainMenu';

import { layoutToggleMenu } from '../redux/layout/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IconButton from 'react-toolbox/lib/button/IconButton';
import { logoutUser } from '../xauth/actions';

class App extends Component {
    toggleDrawerActive = () => {
        this.props.layoutToggleMenu()
    };

    render() {
      const { routes, authState, logoutUser, layoutState } = this.props;
        return (
          <div>
            <Layout>
              <div style={{ flex: 1, overflowY: 'auto', padding: '4.0rem 2.0rem' }}>
                <MainMenu
                  active={layoutState.mainMenu.active}
                  pinned={layoutState.mainMenu.pinned}
                  onOverlayClick={ this.toggleDrawerActive } />
              </div>
                <Panel>
                    <HeaderNav authState={ authState } logoutUser={ logoutUser } title="Divining Rods Admin" onLeftIconClick={ this.toggleDrawerActive } />
                    <div style={{ flex: 1, overflowY: 'auto', padding: '4.0rem 2.0rem' }}>
                        { routes }
                    </div>
                </Panel>
                <Sidebar pinned={ false } width={ 5 }>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '4.0rem 0rem' }}>
                      <div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
                      <div style={{ flex: 1 }}>
                          <p>Supplemental content goes here.</p>
                      </div>
                    </div>
                </Sidebar>
            </Layout>
          </div>

        );
    }
}


function mapStateToProps(state) {
  const { layout, auth } = state;
  return {layoutState: layout, authState: auth };
}
function mapDispatchToProps(dispatch) {
  return {
    layoutToggleMenu: bindActionCreators(layoutToggleMenu, dispatch),
    logoutUser: bindActionCreators(logoutUser, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

App.propTypes = {
  authState: PropTypes.object,
  layoutState: PropTypes.object,
  layoutToggleMenu: PropTypes.func,
  routes: PropTypes.node,
  logoutUser: PropTypes.func
};