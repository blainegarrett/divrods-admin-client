import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';

class RulesetsIndexPage extends Component {
    render() {
        return (
            <div>
                <h2>Rulesets</h2>
                <p>Coming Soon</p>
            </div>
        );
    }
}
export default loginRequired('admin')(RulesetsIndexPage);

RulesetsIndexPage.propTypes = { }