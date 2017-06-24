import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Tooltip from 'react-toolbox/lib/tooltip';
import Avatar from 'react-toolbox/lib/avatar';

const TooltipCell = Tooltip(TableCell);

const sortByCaloriesAsc = (a, b) => {
  if (a.item_id < b.item_id) return -1;
  if (a.item_id > b.item_id) return 1;
  return 0;
};

const sortByCaloriesDesc = (a, b) => {
  if (a.item_id > b.item_id) return -1;
  if (a.item_id < b.item_id) return 1;
  return 0;
};

class TableTest extends Component {
  state = {
    selected: ['Donut'],
    sorted: 'asc'
  };

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByCaloriesAsc : sortByCaloriesDesc;
    return this.props.data || []; //.sort(compare);
  }

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();
    this.setState({ selected: selected.map(item => sortedData[item].name) });
  };

  handleSortClick = () => {
    const { sorted } = this.state;
    const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
    this.setState({ sorted: nextSorting });
  };

  render () {
    const sortedData = this.getSortedData();
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
        {this.props.data.map(function(item, idx) {
            let pref_icon = 'thumb_up';
            if (item.pref.toString() == 'false') {
                pref_icon = 'thumb_down';
            }

            return (
          <TableRow key={idx}>
            <TableCell><a href={'https://collections.artsmia.org/art/' + item.item_id + '/'} target="_blank">{item.item_id}</a></TableCell>
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
/* Component that renders a ReactRounter.Link with some additional click handlers for analytics and menu closing etc */
class PreferencesGrid extends Component {
    render() {
        return (<div><h2>Preference Data</h2><TableTest data={this.props.spork }/></div>);
    }
}

export default PreferencesGrid;