import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';
import ArtLink from '../miacollections/ArtLink';

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
      <Table selectable={false} onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell>Confidence</TableCell>
          <TableCell>Antecedent</TableCell>
          <TableCell>Consequent</TableCell>
        </TableHead>
        {this.props.entities.map((item, idx) => (
          <TableRow key={idx}>
            <TableCell>{item.confidence}</TableCell>
            <TableCell>{format_items(item.ant)}</TableCell>
            <TableCell>{format_items(item.con)}</TableCell>
          </TableRow>
        ))}

      </Table>
    );
  }
}
Grid.propTypes = {
  entities: PropTypes.array // array of items to render
};