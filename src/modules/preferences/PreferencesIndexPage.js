import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';
import PreferenceContent from './PreferenceContent'

class PreferencesIndexPage extends Component {
    render() {
        return (
            <div>
                <h2>Preferences</h2>
                <PreferenceContent />
            </div>
        );
    }
}
export default loginRequired('admin')(PreferencesIndexPage);

PreferencesIndexPage.propTypes = { }