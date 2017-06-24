import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageLink from '../../containers/PageLink';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Tooltip from 'react-toolbox/lib/tooltip';
import { Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import Slider from 'react-toolbox/lib/slider';
import Switch from 'react-toolbox/lib/switch';
import { generateRuleSet } from '../../modules/rulesets/redux/managers';
import connect from 'react-redux/lib/components/connect';

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
      <Table multiSelectable={false} onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell>Default</TableCell>
          <TableCell>Generated</TableCell>
          <TableCell>Min Confidence</TableCell>
          <TableCell>Min Support</TableCell>
          <TableCell>Total Rules</TableCell>
        </TableHead>
        {this.props.data.map((item, idx) => (
          <TableRow key={idx} selected={item.is_default == true}>
            <TableCell>{item.is_default.toString()}</TableCell>
            <TableCell>{item.created_timestamp}</TableCell>
            <TableCell>{item.min_confidence}</TableCell>
            <TableCell>{item.min_support}</TableCell>
            <TableCell><PageLink to={'/rulesets/' + item.resource_id }>{item.total_rules}</PageLink></TableCell>
          </TableRow>
        ))}
      </Table>
    );
  }
}

/* Component that renders a ReactRounter.Link with some additional click handlers for analytics and menu closing etc */
@connect(() => { return {generateRuleSet}}, {generateRuleSet})
class RuleSetGrid extends Component {
    state = {
      showCreateRulesetDialog : false,
      showConfirmationDialog : false,
      min_support : .1,
      min_confidence : .3,
      make_default : false
    }

    hideCreateRulesetHandler = () => {
      this.setState({showCreateRulesetDialog: false});
    }
    showCreateRulesetHandler = () => {
      this.setState({showCreateRulesetDialog: true});
    }

    hideConfirmationDialogHandler = () => {
      this.setState({showConfirmationDialog: false});
    }
    showConfirmationDialogHandler = () => {
      this.setState({showConfirmationDialog: true});
    }

    handleChange = (name, value) => {
      this.setState({...this.state, [name]: value});
    };

    submitHandler = () => {
      this.props.generateRuleSet(this.state.min_support, this.state.min_confidence, this.state.make_default);
      this.setState({showCreateRulesetDialog: false, showConfirmationDialog: true});
    }
    createRulesetDialogActions = [
      { label: "Cancel", onClick: this.hideCreateRulesetHandler },
      { label: "Start", onClick: this.submitHandler.bind(this), primary:true, raised:true}
    ];
    confirmationDialogActions = [
      { label: "Ok", onClick: this.hideConfirmationDialogHandler.bind(this), primary:true, raised:true}
    ];

    render() {
        return (
          <div>
            <h2>RuleSets</h2>

            <Button icon='add' onClick={this.showCreateRulesetHandler} label='Generate Ruleset' raised primary />

            <TableTest data={this.props.spork }/>

            <Dialog
              actions={this.confirmationDialogActions}
              active={this.state.showConfirmationDialog}
              onEscKeyDown={this.hideConfirmationDialogHandler}
              onOverlayClick={this.hideConfirmationDialogHandler}
              title='Ruleset Generation Started'
            >
            <p>Rule generation has started. This may take a few minutes to complete. You will need to manually reload your browser to see changes.</p>
            </Dialog>

            <Dialog
              actions={this.createRulesetDialogActions}
              active={this.state.showCreateRulesetDialog}
              onEscKeyDown={this.hideCreateRulesetHandler}
              onOverlayClick={this.hideCreateRulesetHandler}
              title='Generate New Rulset'
            >

          <section>
            <br />
            <label>Min Support</label>
            <Slider step={.01} min={0} max={1} editable value={this.state.min_support} onChange={this.handleChange.bind(this, 'min_support')} />

            <p>Min Confidence</p>
            <Slider step={.01} min={0} max={1} editable value={this.state.min_confidence} onChange={this.handleChange.bind(this, 'min_confidence')} />

            <p>Make Default on Success</p>
            <Switch
              checked={this.state.make_default}
              label="Make Default"
              onChange={this.handleChange.bind(this, 'make_default')}
            />
          </section>

        </Dialog>

          </div>);
    }
}

export default RuleSetGrid;