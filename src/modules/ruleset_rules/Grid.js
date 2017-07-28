import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { action, LOAD_PREFS_PAGE } from '../../redux/actions';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Tooltip from 'react-toolbox/lib/tooltip';
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';
import { Link } from 'react-router-dom';

const TooltipCell = Tooltip(TableCell);


function format_items(item_list) {
  return item_list.map(function(item, i) {
    const chunks = item.split(":");
    let pref_icon = 'thumb_up';
    if (chunks[1] == '0') {
      pref_icon = 'thumb_down';
    }

    return (
      <Chip key={'chip' + i}>
        <Avatar icon={ pref_icon } />
        <span><a href={'https://collections.artsmia.org/art/' + chunks[0] + '/'} target="_blank">{chunks[0]}</a></span>
      </Chip>
    )
  });
}

class Grid extends Component {
  componentWillMount() {
    //this.props.loadPreferenceData();
  }
  render() {
    return (
      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
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