import React, { Component } from 'react';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';

class Grid extends Component {
  render() {
    return (
      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
          <TableHead>
          <TableCell>Username</TableCell>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
        </TableHead>
        {this.props.entities.map((item, idx) => (
          <TableRow key={idx}>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.first_name}</TableCell>
            <TableCell>{item.last_name}</TableCell>
            <TableCell>{item.email}</TableCell>
          </TableRow>
        ))}

      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

Grid.propTypes = { }