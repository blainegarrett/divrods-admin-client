import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';

class SessionsIndexPage extends Component {
    render() {
        return (
            <div>
                <h2>Sessions</h2>
                <p>Coming Soon</p>
            </div>
        );
    }
}
export default loginRequired('admin')(SessionsIndexPage);

SessionsIndexPage.propTypes = { }