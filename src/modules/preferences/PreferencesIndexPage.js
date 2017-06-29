import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';

class PreferencesIndexPage extends Component {
    render() {
        return (
            <div>
                <h2>Preferences</h2>
                <p>Coming Soon</p>
            </div>
        );
    }
}
export default loginRequired('admin')(PreferencesIndexPage);

PreferencesIndexPage.propTypes = { }