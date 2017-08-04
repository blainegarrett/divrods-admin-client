import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Tooltip from 'react-toolbox/lib/tooltip';
import Avatar from 'react-toolbox/lib/avatar';

const TooltipCell = Tooltip(TableCell);

export default class Grid extends Component {
  render() {
    return (
      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TooltipCell tooltip="Id of Artwork">
            Item
          </TooltipCell>
          <TableCell>Preference</TableCell>
          <TableCell>User</TableCell>
          <TableCell>Sync TimeStamp</TableCell>
        </TableHead>

        {this.props.entities.map(function(item, idx) {
            let pref_icon = 'thumb_up';
            if (item.pref.toString() === 'false') {
                pref_icon = 'thumb_down';
            }

            return (
              <TableRow key={idx}>
                <TableCell><a href={'https://collections.artsmia.org/art/' + item.item_id + '/'} rel="noopener noreferrer" target="_blank">{item.item_id}</a></TableCell>
                <TableCell><Avatar icon={ pref_icon } /></TableCell>
                <TableCell>{item.user_id}</TableCell>
                <TableCell>{item.synced_timestamp}</TableCell>
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