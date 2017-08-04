// A set of reusable react toolbox extensions
import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { action } from '../../redux/actions';
import { INITIATE_CHANGE_PASSWORD } from '../actions';
import  MenuItem  from 'react-toolbox/lib/menu/MenuItem';

class ChangePasswordAction extends Component {
  state = {
    showChangePasswordDialog : false,
    showConfirmationDialog : false,
    isFormValid: false,

    // Form Values State
    password : '',
    password_confirm : '',
  }

  isFormValid = (override) => {
    let values = {
      'password': this.state.password,
      'password_confirm': this.state.password_confirm

    }
    // Apply override if we have one
    if (override) {
      values[override.name] = override.value
    }

    console.log(values);

    let is_valid = [values.password_confirm, values.password].every(function(fieldValue, i, arr) {
      if (fieldValue.trim().length < 1)
        return false
      return true;
    });

    if (!is_valid) {
      return false;
    }


    if (values.password === values.password_confirm) {
      return true;
    }

    return false;
  }

  hideCreateRulesetHandler = () => {
    this.setState({showChangePasswordDialog: false});
  }

  showChangePasswordHandler = () => {
    this.setState({showChangePasswordDialog: true});
  }

  hideConfirmationDialogHandler = () => {
    this.setState({showConfirmationDialog: false, showChangePasswordDialog:false});
  }
  showConfirmationDialogHandler = () => {
    this.setState({showConfirmationDialog: true});
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value, isFormValid: this.isFormValid({name:name, value:value})});
  };

  submitHandler = () => {
    if (this.isFormValid()) {
      this.props.changePassword(this.props.user.resource_id, this.state.password);
    }
  }

  confirmationDialogActions = [
    { label: "Continue", onClick: this.hideConfirmationDialogHandler.bind(this), primary:true, raised:true}
  ];

  render() {
    const user = this.props.user;

    let do_show_dialog = this.state.showChangePasswordDialog;
    if (this.props.formState.async_success) {
      do_show_dialog = false;
    }

    let createRulesetDialogActions = [
      { label: "Cancel", onClick: this.hideCreateRulesetHandler },
      { label: "Change Password", disabled:!this.state.isFormValid, onClick: this.submitHandler.bind(this), primary:true, raised:true}
    ];

    return (
      <div>
        <MenuItem onClick={this.showChangePasswordHandler} value='lock-outline' icon='security' caption='Change Password' />
        {/* <Button icon='add' onClick={this.showChangePasswordHandler} primary raised>Create User</Button> */}

        <Dialog
          actions={createRulesetDialogActions}
          active={do_show_dialog}
          onEscKeyDown={this.hideCreateRulesetHandler}
          onOverlayClick={this.hideCreateRulesetHandler}
          title='Change Password'
          >
            <section>

              { this.props.formState.error_message &&
                (<p>Error: {this.props.formState.error_message}</p>) }

              <h3>Change Password for <em>{ user.username }</em></h3>

              <Input required={true} type='text' label='Password' error={false} value={this.state.password} onChange={this.handleChange.bind(this, 'password')} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
              <Input required={true} type='text' label='Password (Confirm)' error={false} value={this.state.password_confirm} onChange={this.handleChange.bind(this, 'password_confirm')} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
            </section>
          </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePassword: bindActionCreators((user_resource_id, password) => action(INITIATE_CHANGE_PASSWORD, {user_resource_id, password}), dispatch),
  };
  /*
  return {
    changePassword: bindActionCreators((user_resource_id, password)  => {
      action(INITIATE_CHANGE_PASSWORD, {user_resource_id, password}), dispatch)
    })
  };
  */
}

function mapStateToProps(state) {
  return {
    formState: state.changePasswordFormState
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordAction);

ChangePasswordAction.propTypes = { }