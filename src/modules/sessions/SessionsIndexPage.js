import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';
import SessionsContent from './SessionsContent';

class SessionsIndexPage extends Component {
    render() {
        return (
            <div><h2>Sessions</h2><SessionsContent /></div>
        );
    }
}
export default loginRequired('admin')(SessionsIndexPage);

SessionsIndexPage.propTypes = { }