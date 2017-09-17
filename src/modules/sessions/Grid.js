// Grid for Pref Sessions list
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Chip from 'react-toolbox/lib/chip';
import ArtLink from '../miacollections/ArtLink';
import Avatar from 'react-toolbox/lib/avatar';

function format_items(item_list) {
  return item_list.map(function(item, i) {
    const chunks = item.split(':');
    let pref_icon = 'thumb_up';
    if (chunks[1] === '0') {
      pref_icon = 'thumb_down';
    }

    return (
      <Chip key={'chip' + i}>
        <Avatar icon={ pref_icon } />
        <span><ArtLink id={chunks[0]} /></span>
      </Chip>
    )
  });
}

export default class Grid extends Component {
  render() {
    return (
      <Table selectable={false} style={{ marginTop: 10 }}>
          <TableHead>
          <TableCell>User/Session Id</TableCell>
          <TableCell>Last Prefernece</TableCell>
          <TableCell>First Preference</TableCell>
          <TableCell>Preferences</TableCell>
          <TableCell>Total Prefs</TableCell>
        </TableHead>
        {this.props.entities.map((item, idx) => (
          <TableRow key={idx}>
            <TableCell>{item.user_id}</TableCell>
            <TableCell>{item.latest_timestamp}</TableCell>
            <TableCell>{item.created_timestamp}</TableCell>
            <TableCell>{ format_items(item.rule_item_ids) }</TableCell>
            <TableCell>{ item.rule_item_ids.length }</TableCell>
          </TableRow>
        ))}

      </Table>
    );
  }
}

Grid.propTypes = {
  entities: PropTypes.array // array of items to render
};