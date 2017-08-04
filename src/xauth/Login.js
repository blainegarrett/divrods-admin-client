// components/Login.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button/Button';

export default class Login extends Component {

  state = {
    username : '',
    password : '',
  }

  handleFieldChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  }

  submitHandler = () => {
    const username = this.state.username;
    const password = this.state.password;
    const creds = { username: username.trim(), password: password.trim() }
    this.props.onLoginClick(creds)
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <section>
        <div>
          <div>

            <Input label='Username' type='text' value={this.state.username} onChange={this.handleFieldChange.bind(this, 'username')} onKeyPress={this.handleEnterKey.bind(this)} className="form-control" placeholder='Username' autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
            <Input label='Password' type='password' value={this.state.password} onChange={this.handleFieldChange.bind(this, 'password')} onKeyPress={this.handleEnterKey.bind(this)} className="form-control" placeholder='Password' autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

            <Button onClick={this.submitHandler.bind(this)} primary raised>
              Login
            </Button>

            {errorMessage && (<p>Error: {errorMessage}</p>) }
          </div>
        </div>
      </section>
    )
  }

  handleClick() {
    const username = this.state.username
    const password = this.state.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }

  handleEnterKey(e) {
    if (e.key === 'Enter') {
      this.submitHandler();
    }
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}