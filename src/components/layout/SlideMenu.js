// Side Menu Component
import React from 'react';
import PageLink from '../../containers/PageLink';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';

export default function SlideMenu() {
  return (
    <div style={{'top': '65px'}}>
      <br />
      <br />
      <br />
      <br /> {/* TODO: 65px; */}
      <br />
      <List selectable ripple>
        <ListDivider />
        <ListSubHeader caption='Preference Engine' />
        <ListDivider />
        <ListItem leftIcon='thumbs_up_down'><PageLink to="/preferences">Preference Data</PageLink></ListItem>
        <ListItem leftIcon='device_hub'><PageLink to="/rulesets">Rulesets</PageLink></ListItem>
        <ListItem caption='Sessions' leftIcon='person' />
        <ListItem caption='Item Support' leftIcon='art_track' />
      </List>
    </div>
  );
}