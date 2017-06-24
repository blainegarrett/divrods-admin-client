import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';

import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/components/connect';
import { layoutToggleMenu, layoutCloseMenu, fetchAuth } from '../actions';
import { initAuthServices, signOut } from '../auth/actions/auth_state';

import SlideMenu from '../components/layout/SlideMenu';
import HeaderNav from '../components/layout/HeaderNav';
import Helmet from 'react-helmet';
import { Grid } from '../lib/grid';
import classnames from 'classnames';
import NavThing from '../xauth/NavThing';


// Given the global state, update our props with state bits we care ab
function mapStateToProps(state) {

  const { isAuthenticated, errorMessage } = state.xAuthReducer;

  return {
    layoutState: state.layout,
    authStateStore: state.authStateStore,
    authFlowStore: state.authFlowStore,
    isAuthenticated, // XAauth
    errorMessage // XAauth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch:dispatch,
    layoutToggleMenu: bindActionCreators(layoutToggleMenu, dispatch),
    layoutCloseMenu: bindActionCreators(layoutCloseMenu, dispatch),
    fetchAuth: bindActionCreators(fetchAuth, dispatch),
    initAuthServices: bindActionCreators(initAuthServices, dispatch),
    signOut: bindActionCreators(signOut, dispatch)
  }
}

// Connect App to global state and bind the action creators so we can use them
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  constructor(props) {
    super(props);

    /* Bind the handlers that will trigger actions */
    this.handleLayoutToggleClick = this.handleLayoutToggleClick.bind(this);
    this.handleLayoutCloseClick = this.handleLayoutCloseClick.bind(this);
  }

  componentDidMount() {
    //this.props.initAuthServices();
    //this.props.fetchAuth(); // Trigger fetch of legacy GAE auth state
    return
  }

  /* Menu Toggle Actions */
  handleLayoutToggleClick(e) {
    this.props.layoutToggleMenu();
    e.preventDefault();
  }

  handleLayoutCloseClick(e) {
    this.props.layoutCloseMenu();
    e.preventDefault();
  }

  render() {
    const { children, layoutState, authStateStore, signOut } = this.props;

    // XAuth
    const { dispatch, isAuthenticated, errorMessage } = this.props;


    console.log([dispatch, isAuthenticated, errorMessage])


    // Layout state
    let is_fluid = layoutState['is_fluid'];
    let is_menu_open = layoutState['menu_open'];

    // Determine layout wrappers
    let wrapper_classes = [];
    if (is_menu_open) { wrapper_classes.push('show-menu'); }
    if (is_fluid) { wrapper_classes.push('fluid-layout'); }

    return (
      <Layout className={ classnames(wrapper_classes) }>
        <Helmet titleTemplate="%s | MPLSART.COM"/>

        <div className="modal-backdrop" onClick={ this.handleLayoutCloseClick }></div>

        <NavDrawer style={{'top':'65px'}} active={is_menu_open} pinned={false} permanentAt='xxxl' onOverlayClick={ this.handleLayoutCloseClick }>
          <SlideMenu is_menu_open={is_menu_open}/>
          </NavDrawer>
        <HeaderNav
          handleLayoutToggleClick = {this.handleLayoutToggleClick}
          is_fluid={ is_fluid }
          authStateStore={authStateStore}
          />

          <Panel>
            <section style={{ margin: '4rem'}}>

              <NavThing isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch} />

                { children }
            </section>
          </Panel>
          <Sidebar pinned={ false } width={ 5 }>
            {/* }
            <br />
            <br />
            <br />
            <br />
            <div>sss</div>
            <div style={{ flex: 1 }}>
            <p>Supplemental content goes here.</p>
            </div>
          */}
          </Sidebar>
      </Layout>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  authStateStore: PropTypes.object,
  authFlowStore: PropTypes.object,
  layoutToggleMenu: PropTypes.func,
  layoutCloseMenu: PropTypes.func,
  initAuthServices: PropTypes.func,
  layoutState: PropTypes.object,
  fetchAuth: PropTypes.func,
  signOut: PropTypes.func,

  // Injected by React Router
  children: PropTypes.node
}

