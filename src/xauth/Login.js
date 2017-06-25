// components/Login.js

import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

export default class Login extends Component {

  state = {
      username : '',
      password : '',
    }

  handleChange = (name, value) => {
    console.log([name, value]);
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

    console.log(this.state);

    return (
      <section style={{width:'50%'}}>
        <Input label='Username' type='text' ref='username' value={this.state.username} onChange={this.handleChange.bind(this, 'username')} className="form-control" placeholder='Username'/>
        <Input label='Password' type='password' ref='password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} className="form-control" placeholder='Password'/>
        <Button onClick={this.submitHandler.bind(this)} primary raised>
          Login
        </Button>

        {errorMessage &&
          <p>{errorMessage}</p>
        }
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