import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';
import RulesetsContent from './RulesetsContent';

class RulesetsIndexPage extends Component {
    render() {
        return (
            <div>
                <h2>Rulesets</h2>
                <RulesetsContent />
            </div>
        );
    }
}
export default loginRequired('admin')(RulesetsIndexPage);

RulesetsIndexPage.propTypes = { }