import React from 'react';
import PropTypes from 'prop-types';
import {IconMenu} from 'react-toolbox/lib/menu';

export default function EventDateMenu({children}) {
  // Simple Renderer for the options menue for an event date
  return (<IconMenu icon="more_vert"  menuRipple>{ children }</IconMenu>)
}

EventDateMenu.propTypes = {
  children: PropTypes.node, //MenuItem nodes
};
