import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';
import AuthUsersContent from './AuthUsersContent';

class AuthUsersIndexPage extends Component {
  render() {
    return (<div><h2>Users</h2><AuthUsersContent /></div>);
  }
}
export default loginRequired('admin')(AuthUsersIndexPage);