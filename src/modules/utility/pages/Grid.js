import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Tooltip from 'react-toolbox/lib/tooltip';
import ArtLink from '../../miacollections/ArtLink';

const TooltipCell = Tooltip(TableCell);

export default class Grid extends Component {
  render() {
    return (
      <Table selectable={false} onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TooltipCell tooltip="Id of Artwork - Click # to view artwork">
            Item
          </TooltipCell>
          <TableCell>Tag Color</TableCell>
          <TableCell>Room</TableCell>
          <TableCell>Available</TableCell>
        </TableHead>

        {this.props.entities.map(function(item, idx) {
            return (
              <TableRow key={idx}>
                <TableCell><ArtLink id={ item.artid }/></TableCell>
                <TableCell>{ item.color }</TableCell>
                <TableCell>{ item.room }</TableCell>
                <TableCell>{ item.available.toString() }</TableCell>
              </TableRow>
            );
          }
        )}
      </Table>
    );
  }
}
Grid.propTypes = {
  entities: PropTypes.array // array of items to render
};