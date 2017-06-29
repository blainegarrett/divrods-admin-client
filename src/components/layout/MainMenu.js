import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';

import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ["sm","smTablet","md","lg","lgTablet","xl","xxl","xxxl"]
class MainMenu extends Component {
  render() {
    const { active, pinned, onOverlayClick, changePage } = this.props;

    return (
      <NavDrawer permanentAt='xxxl' active={active} pinned={pinned} onOverlayClick={ onOverlayClick }>
        <div style={{ flex: 1, overflowY: 'auto', padding: '4.0rem 0rem' }}>
          <List selectable ripple>
            <ListDivider />
            <ListSubHeader caption='Preference Engine' />
            <ListDivider />
            <ListItem onClick={() => changePage('/preferences')} leftIcon='thumbs_up_down' caption='Preference Data'></ListItem>
            <ListItem onClick={() => changePage('/rulesets')} leftIcon='device_hub' caption='Rulesets'></ListItem>
            <ListItem onClick={() => changePage('/sessions')} leftIcon='person' caption='Sessions'/>
            <ListItem onClick={() => changePage('/items')} leftIcon='art_track' caption='Item Support' />
          </List>
        </div>
      </NavDrawer>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (path) => push(path)
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(MainMenu);

MainMenu.propTypes = {
  onOverlayClick: PropTypes.func,
  changePage: PropTypes.func,
  active: PropTypes.bool,
  pinned: PropTypes.bool,
};