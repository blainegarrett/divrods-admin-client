// Processor Set for Change Password
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { action, INITIATE_MAKE_RULESET_DEFAULT } from '../../redux/actions';
import  MenuItem  from 'react-toolbox/lib/menu/MenuItem';

class SetRulesetDefaultAction extends Component {
  state = {
    showConfirmationDialog : false,
  }

  hideConfirmationDialogHandler = () => {
    this.setState({showConfirmationDialog: false});
    this.props.resetForm()
  }

  showConfirmationDialogHandler = () => {
    this.setState({showConfirmationDialog: true});
    this.props.showForm()
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value });
  };

  submitHandler = () => {
    this.props.makeRulesetDefault(this.props.ruleset.resource_id);
  }

  render() {
    const formState = this.props.formState || {};
    let do_show_dialog = formState.showDialog || false;

    let confirmationDialogActions = [
      { label: 'No', onClick: this.hideConfirmationDialogHandler },
      { label: 'Yes', onClick: this.submitHandler.bind(this), primary:true, raised:true}
    ];

    return (
      <div>
        <MenuItem onClick={this.showConfirmationDialogHandler} value='lock-outline' caption='Make Default' />
        <Dialog
          actions={confirmationDialogActions}
          active={do_show_dialog}
          onEscKeyDown={this.hideConfirmationDialogHandler}
          onOverlayClick={this.hideConfirmationDialogHandler}
          title='Make Ruleset Default'
          >
            <section>
              { formState.error_message &&
                (<p>Error: {formState.error_message}</p>) }

                <p>Once this ruleset is made <em>default</em>, its rules will be used to determine recommendations for the divrods.</p>
                <p>Are you sure you want to make this ruleset default?</p>
            </section>
          </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    makeRulesetDefault: bindActionCreators((ruleset_resource_id) => action(INITIATE_MAKE_RULESET_DEFAULT, {ruleset_resource_id}), dispatch),
    resetForm: bindActionCreators(() => action('RESETFORMSTATE', {formstateId: ownProps.ruleset.resource_id}), dispatch),
    showForm: bindActionCreators(() => action('INITFORMSTATE', {formstateId: ownProps.ruleset.resource_id}), dispatch),
  };
}

function mapStateToProps(state, props) {
  return {
    formState: state.makeRulesetDefaultFormState.index[props.ruleset.resource_id] // or default from reducer
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetRulesetDefaultAction);

SetRulesetDefaultAction.propTypes = {
  makeRulesetDefault : PropTypes.func, // bound action creator
  ruleset : PropTypes.object, // user resource
  formState : PropTypes.object, // reducer with the changePasswordFormState
  resetForm : PropTypes.func,
  showForm: PropTypes.func,
};
