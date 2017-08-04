// Grid for User list
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import  IconMenu  from 'react-toolbox/lib/menu/IconMenu';
import ChangePasswordAction from './ChangePasswordAction';

class GridActionMenu extends Component {
  render() {
    const user = this.props.item;

    return (
      <IconMenu icon='more_vert' position='topLeft' menuRipple>
        { /* <MenuItem value='edit_user' icon='edit' caption='Edit User' /> */ }
        <ChangePasswordAction user={ user } />
        { /* <MenuItem value='lock-outline' icon='security' caption='Change Password' /> */ }
        { /* <MenuItem value='delete_user' icon='delete' caption='Delete User' />  */ }
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
      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
          <TableHead>
          <TableCell>Username</TableCell>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableHead>
        {this.props.entities.map((item, idx) => (
          <TableRow key={idx}>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.first_name}</TableCell>
            <TableCell>{item.last_name}</TableCell>
            <TableCell>{item.email}</TableCell>
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