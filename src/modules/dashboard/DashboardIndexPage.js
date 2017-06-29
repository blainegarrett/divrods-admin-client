import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';

class DashboardIndexPage extends Component {
    render() {
        return (
            <div>
                <h2>Welcome</h2>
                <p>Coming Soon</p>
            </div>
        );
    }
}
export default loginRequired('admin')(DashboardIndexPage);
DashboardIndexPage.propTypes = { }