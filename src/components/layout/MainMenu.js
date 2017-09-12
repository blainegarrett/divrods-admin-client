import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import { REACT_APP_ADMIN_CLIENT_VERSION } from '../../constants';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { navigate } from '../../redux/actions';

// ["sm","smTablet","md","lg","lgTablet","xl","xxl","xxxl"]

const _ListItemRouteLinkThing = ({ url, leftIcon, caption, boundNavigate }) => (
  <ListItem onClick={() => {
    return boundNavigate(url);
    }}
    caption={caption} leftIcon={leftIcon}
   />);

function mapStateToProps(state) {
  console.log(state);

  //const { layout, auth } = state;
  //return {layoutState: layout, authState: auth };
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    boundNavigate: bindActionCreators((url) => { return navigate(url); }, dispatch),
  };
}

const ListItemRouteLinkThing = connect(mapStateToProps, mapDispatchToProps)(_ListItemRouteLinkThing);



_ListItemRouteLinkThing.propTypes = {
  history: PropTypes.object,
  url: PropTypes.string,
  leftIcon: PropTypes.node,
  caption: PropTypes.string
};


const ListItemRouteLink = withRouter(ListItemRouteLinkThing);

export default class MainMenu extends Component {
  render() {
    const { active, pinned, onOverlayClick } = this.props;
    return (
      <NavDrawer permanentAt='xxxl' active={active} pinned={pinned} onOverlayClick={ onOverlayClick }>
        <div style={{ flex: 1, overflowY: 'auto', padding: '4.0rem 0rem' }}>
          <List selectable ripple>
            <ListDivider />
            <ListSubHeader caption='Utility Service' />
            <ListDivider />
            <ListItemRouteLink url='/taggedart' leftIcon='label' caption='Tagged Artwork' />
            <ListSubHeader caption='Preference Service' />
            <ListDivider />

            <ListItemRouteLink url='/preferences' leftIcon='thumbs_up_down' caption='Preference Data' />
            <ListItemRouteLink url='/rulesets' leftIcon='device_hub' caption='Rulesets' />
            <ListItemRouteLink url='/sessions' leftIcon='directions_walk' caption='Sessions'/>
            <ListItemRouteLink url='/items' leftIcon='art_track' caption='Item Support' />
            <ListDivider />
            <ListSubHeader caption='Authentication' />
            <ListItemRouteLink url='/auth/users' leftIcon='security' caption='Users' />
            <ListSubHeader caption='Settings' />
            <ListItemRouteLink url='/settings/environment' leftIcon='settings' caption='Environment' />
          </List>
        </div>

        <div>
          <pre style={{ margin:'10px' }}>Client version: { REACT_APP_ADMIN_CLIENT_VERSION } </pre>
        </div>
      </NavDrawer>
    );
  }
}

MainMenu.propTypes = {
  onOverlayClick: PropTypes.func,
  active: PropTypes.bool,
  pinned: PropTypes.bool,
};