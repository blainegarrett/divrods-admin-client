import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageLink from '../../containers/PageLink';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Avatar from 'react-toolbox/lib/avatar';

//const TooltipCell = Tooltip(TableCell);
import Chip from 'react-toolbox/lib/chip';

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
          <TableCell>Confidence</TableCell>
          <TableCell>Antecedent</TableCell>
          <TableCell>Consequent</TableCell>
        </TableHead>
        {this.props.data.map((item, idx) => (
          <TableRow key={idx} selected={this.state.selected.indexOf(item.name) !== -1}>
            <TableCell>{item.confidence}</TableCell>
            <TableCell>{format_items(item.ant)}</TableCell>
            <TableCell>{format_items(item.con)}</TableCell>
          </TableRow>
        ))}
      </Table>
    );
  }
}
/* Component that renders a ReactRounter.Link with some additional click handlers for analytics and menu closing etc */
class RulesGrid extends Component {
    render() {
        return (<div><h2>Rules</h2><TableTest data={this.props.spork }/></div>);
    }
}

export default RulesGrid;