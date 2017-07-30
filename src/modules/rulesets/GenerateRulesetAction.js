// A set of reusable react toolbox extensions
import Button from 'react-toolbox/lib/button/Button';
import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Slider from 'react-toolbox/lib/slider/Slider';
import Switch from 'react-toolbox/lib/switch/Switch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { action, INITIATE_GENERATE_RULES } from '../../redux/actions';


class GenerateRulesetAction extends Component {
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
      this.setState({showConfirmationDialog: false, showCreateRulesetDialog:false});
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
      { label: "Continue", onClick: this.hideConfirmationDialogHandler.bind(this), primary:true, raised:true}
    ];
  render() {
    return (
      <div>
      <Button icon='add' onClick={this.showCreateRulesetHandler} primary raised>Generate Ruleset</Button>

        <Dialog
          actions={this.confirmationDialogActions}
          active={this.state.showConfirmationDialog}
          onEscKeyDown={this.hideConfirmationDialogHandler}
          onOverlayClick={this.hideConfirmationDialogHandler}
          title='Ruleset Generation Started'
        >
          <p>Generating the new ruleset may take a few minutes to complete. Refresh this page in a few minutes to see the generated rules.</p>
        </Dialog>

        <Dialog
          actions={this.createRulesetDialogActions}
          active={this.state.showCreateRulesetDialog}
          onEscKeyDown={this.hideCreateRulesetHandler}
          onOverlayClick={this.hideCreateRulesetHandler}
          title='Generate New Ruleset'
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
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    generateRuleSet: bindActionCreators((min_support, min_confidence, make_default) => action(INITIATE_GENERATE_RULES, {min_support, min_confidence, make_default}), dispatch),
  };
}

function mapStateToProps(state) { return {}; }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateRulesetAction);

GenerateRulesetAction.propTypes = { }