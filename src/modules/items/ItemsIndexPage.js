import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';

class ItemsIndexPage extends Component {
    render() {
        return (
            <div>
                <h2>Items</h2>
                <p>Coming Soon</p>
            </div>
        );
    }
}
export default loginRequired('admin')(ItemsIndexPage);
ItemsIndexPage.propTypes = { }