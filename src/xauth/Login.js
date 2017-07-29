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
      <section style={{marginTop:'10%', width:'40%', marginRight:'auto', marginLeft:'auto',position:'static'}}>
        <div style={{backgroundColor:'#fff', position:'relative', height:'300px', border: '1px solid #8a8a8a'}}>
          <div style={{ margin: '40px auto 56px', 'width': '75%', 'display': 'block'}}>
            <Input label='Username' type='text' ref='username' value={this.state.username} onChange={this.handleFieldChange.bind(this, 'username')} className="form-control" placeholder='Username'/>
            <Input label='Password' type='password' ref='password' value={this.state.password} onChange={this.handleFieldChange.bind(this, 'password')} className="form-control" placeholder='Password'/>

            <Button style={{width:'100%'}} onClick={this.submitHandler.bind(this)} primary raised>
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