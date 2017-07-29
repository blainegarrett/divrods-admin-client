// components/Login.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button/Button';

export default class Login extends Component {

  state = {
    username : 'utility_user',
    password : 'fYKp?$!69+berA7z@kv3uGS#VhEB5',
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
            <Input label='Username' type='text' ref='username' value={this.state.username} onChange={this.handleFieldChange.bind(this, 'username')} className="form-control" placeholder='Username'/>
            <Input label='Password' type='password' ref='password' value={this.state.password} onChange={this.handleFieldChange.bind(this, 'password')} className="form-control" placeholder='Password'/>

            <Button onClick={this.submitHandler.bind(this)} primary raised>
              Login
            </Button>

            {errorMessage &&
              <p>Error: {errorMessage}</p>
            }
          </div>
        </div>
      </section>
    )
  }

  handleClick(event) {
    const username = this.state.username
    const password = this.state.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}