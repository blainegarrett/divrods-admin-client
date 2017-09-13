// Grid for Pref Items list
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import ArtLink from '../miacollections/ArtLink';

export default class Grid extends Component {
  render() {
    return (
      <Table selectable={false} style={{ marginTop: 10 }}>
          <TableHead>
          <TableCell>Item Id</TableCell>
          <TableCell>Likes</TableCell>
          <TableCell>Dislikes</TableCell>
        </TableHead>
        {this.props.entities.map((item, idx) => (
          <TableRow key={idx}>
            <TableCell><ArtLink id={ item.item_id }/></TableCell>
            <TableCell>{item.total_likes}</TableCell>
            <TableCell>{item.total_dislikes}</TableCell>
          </TableRow>
        ))}

      </Table>
    );
  }
}

Grid.propTypes = {
  entities: PropTypes.array // array of items to render
};