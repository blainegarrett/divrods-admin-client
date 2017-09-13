import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';
import ItemsContent from './ItemsContent';

class ItemsIndexPage extends Component {
    render() {
        return (
            <div><h2>Items</h2><ItemsContent /></div>
        );
    }
}
export default loginRequired('admin')(ItemsIndexPage);
ItemsIndexPage.propTypes = { }