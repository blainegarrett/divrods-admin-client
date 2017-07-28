import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';

import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ["sm","smTablet","md","lg","lgTablet","xl","xxl","xxxl"]

const ListItemRouteLinkThing = ({ history, url, leftIcon, caption }) => (
  <ListItem onClick={() => history.push(url)} caption={caption} leftIcon={leftIcon} />
);
const ListItemRouteLink = withRouter(ListItemRouteLinkThing);

export default class MainMenu extends Component {
  render() {
    const { active, pinned, onOverlayClick, changePage } = this.props;
    return (
      <NavDrawer permanentAt='xxxl' active={active} pinned={pinned} onOverlayClick={ onOverlayClick }>
        <div style={{ flex: 1, overflowY: 'auto', padding: '4.0rem 0rem' }}>
          <List selectable ripple>
            <ListDivider />
            <ListSubHeader caption='Preference Engine' />
            <ListDivider />

            <ListItemRouteLink url='/preferences' leftIcon='thumbs_up_down' caption='Preference Data' />
            <ListItemRouteLink url='/rulesets' leftIcon='device_hub' caption='Rulesets' />
            <ListItemRouteLink url='/sessions' leftIcon='directions_walk' caption='Sessions'/>
            <ListItemRouteLink url='/items' leftIcon='art_track' caption='Item Support' />
            <ListDivider />
            <ListSubHeader caption='Authentication' />
            <ListItemRouteLink url='/auth/users' leftIcon='security' caption='Users' />
          </List>
        </div>
      </NavDrawer>
    );
  }
}

MainMenu.propTypes = {
  onOverlayClick: PropTypes.func,
  changePage: PropTypes.func,
  active: PropTypes.bool,
  pinned: PropTypes.bool,
};