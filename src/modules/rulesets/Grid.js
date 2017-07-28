import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { action, LOAD_PREFS_PAGE } from '../../redux/actions';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Tooltip from 'react-toolbox/lib/tooltip';
import Avatar from 'react-toolbox/lib/avatar';
import { Link } from 'react-router-dom';

const TooltipCell = Tooltip(TableCell);

class Grid extends Component {
  componentWillMount() {
    //this.props.loadPreferenceData();
  }
  render() {
    return (
      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
          <TableHead>
          <TableCell>Default</TableCell>
          <TableCell>Generated</TableCell>
          <TableCell>Min Confidence</TableCell>
          <TableCell>Min Support</TableCell>
          <TableCell>Total Rules</TableCell>
        </TableHead>
        {this.props.entities.map((item, idx) => (
          <TableRow key={idx} selected={item.is_default == true}>
            <TableCell>{item.is_default.toString()}</TableCell>
            <TableCell>{item.created_timestamp}</TableCell>
            <TableCell>{item.min_confidence}</TableCell>
            <TableCell>{item.min_support}</TableCell>
            <TableCell><Link to={'/rulesets/' + item.resource_id }>{item.total_rules}</Link></TableCell>
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