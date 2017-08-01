// A set of reusable react toolbox extensions
import Button from 'react-toolbox/lib/button/Button';
import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { action } from '../../redux/actions';
import { INITIATE_CREATE_USER } from '../actions';

class CreateUserAction extends Component {
  state = {
    showCreateUserDialog : false,
    showConfirmationDialog : false,
    isFormValid: false,

    // Form Values State
    username : '',
    first_name : '',
    last_name : '',
    email : '',
    password : '',
    password_confirm : '',
  }

  isFormValid = () => {
    let username = this.state.username;
    let password = this.state.password;
    let first_name = this.state.first_name;
    let last_name = this.state.last_name;
    let email = this.state.email;

    let base_valid = [username, password, email, first_name, last_name].every(function(fieldValue, i, arr) {
      if (fieldValue.trim().length < 1)
        return false

      return true;
    });

    return base_valid;
  }

  hideCreateRulesetHandler = () => {
    this.setState({showCreateUserDialog: false});
  }
  showCreateRulesetHandler = () => {
    this.setState({showCreateUserDialog: true});
  }

  hideConfirmationDialogHandler = () => {
    this.setState({showConfirmationDialog: false, showCreateUserDialog:false});
  }
  showConfirmationDialogHandler = () => {
    this.setState({showConfirmationDialog: true});
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value, isFormValid: this.isFormValid()});
  };

  submitHandler = () => {
    if (this.isFormValid()) {
      this.props.createUser(this.state.username, this.state.first_name, this.state.last_name, this.state.email, this.state.password);
    }
  }

  confirmationDialogActions = [
    { label: "Continue", onClick: this.hideConfirmationDialogHandler.bind(this), primary:true, raised:true}
  ];

  render() {

    let do_show_dialog = this.state.showCreateUserDialog;
    if (this.props.formState.async_success) {
      do_show_dialog = false;
    }

    let createRulesetDialogActions = [
      { label: "Cancel", onClick: this.hideCreateRulesetHandler },
      { label: "Create", disabled:!this.state.isFormValid, onClick: this.submitHandler.bind(this), primary:true, raised:true}
    ];

    return (
      <div>
        <Button icon='add' onClick={this.showCreateRulesetHandler} primary raised>Create User</Button>

        <Dialog
          actions={createRulesetDialogActions}
          active={do_show_dialog}
          onEscKeyDown={this.hideCreateRulesetHandler}
          onOverlayClick={this.hideCreateRulesetHandler}
          title='Create New User'
          >
            <section>

              { this.props.formState.error_message &&
                (<p>Error: {this.props.formState.error_message}</p>) }

              <h3>Login Credentials</h3>
              <Input required={true} type='text' label='Username' error={false} value={this.state.username} onChange={this.handleChange.bind(this, 'username')} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
              <Input required={true} type='text' label='Password' error={false} value={this.state.password} onChange={this.handleChange.bind(this, 'password')} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

              <h3>Profile</h3>
              <Input required={true} type='text' label='Email' error={false} value={this.state.email} onChange={this.handleChange.bind(this, 'email')} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
              <Input required={true} type='text' label='First Name' error={false} value={this.state.first_name} onChange={this.handleChange.bind(this, 'first_name')} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
              <Input required={true} type='text' label='Last Name' error={false} value={this.state.last_name} onChange={this.handleChange.bind(this, 'last_name')} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
            </section>
          </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: bindActionCreators((username, first_name, last_name, email, password) => action(INITIATE_CREATE_USER, {username, first_name, last_name, email, password}), dispatch),
  };
}

function mapStateToProps(state) {
  return {
    formState: state.createUserFormState
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserAction);

CreateUserAction.propTypes = { }