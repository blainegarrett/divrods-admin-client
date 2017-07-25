import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';

class AuthUsersIndexPage extends Component {
    render() {
        return (
            <div>
                <h2>Auth Users</h2>
                <p>Coming Soon</p>
            </div>
        );
    }
}
export default loginRequired('admin')(AuthUsersIndexPage);
AuthUsersIndexPage.propTypes = { }