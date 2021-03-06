// A set of reusable react toolbox extensions

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ButtonGroup extends Component {
    render() {
        return (<div>{ this.props.children }</div>);
    }
}

//https://material.io/guidelines/layout/structure.html#structure-toolbars
export class Toolbar extends Component {
  render() {
    return (
      <div>
        <div>
          <div style={{textAlign:'left', 'width':'50%', 'float':'left'}}>
            { this.props.leftButtonGroup }
        </div>

          <div style={{textAlign:'right', 'width':'50%', 'float':'right'}}>
            { this.props.rightButtonGroup }
        </div>
      </div>
    </div>);
  }
}
Toolbar.propTypes = {
  rightButtonGroup: PropTypes.node,
  leftButtonGroup: PropTypes.node,
  children: PropTypes.node
};