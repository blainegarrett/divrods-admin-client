import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import  IconMenu  from 'react-toolbox/lib/menu/IconMenu';
import { Link } from 'react-router-dom';
import SetRulesetDefaultAction from './SetRulesetDefaultAction';

class GridActionMenu extends Component {
  render() {
    const ruleset = this.props.item;

    return (
      <IconMenu icon='more_vert' position='topLeft' menuRipple>
        <SetRulesetDefaultAction ruleset={ ruleset } />
    </IconMenu>
    );
  }
}
GridActionMenu.propTypes = {
  item : PropTypes.object, // bound action creator
};

export default class Grid extends Component {
  render() {
    return (
      <Table multiSelectable style={{ marginTop: 10 }}>
          <TableHead>
          <TableCell>Default</TableCell>
          <TableCell>Generated</TableCell>
          <TableCell>Min Confidence</TableCell>
          <TableCell>Min Support</TableCell>
          <TableCell>Total Rules</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableHead>
        {this.props.entities.map((item, idx) => (
          <TableRow key={idx} selected={item.is_default === true}>
            <TableCell>{item.is_default.toString()}</TableCell>
            <TableCell>{item.created_timestamp}</TableCell>
            <TableCell>{item.min_confidence}</TableCell>
            <TableCell>{item.min_support}</TableCell>
            <TableCell><Link to={'/rulesets/' + item.resource_id }>{item.total_rules}</Link></TableCell>
            <TableCell><GridActionMenu item={ item }/></TableCell>
          </TableRow>
        ))}
      </Table>
    );
  }
}

Grid.propTypes = {
  entities: PropTypes.array // array of items to render
};