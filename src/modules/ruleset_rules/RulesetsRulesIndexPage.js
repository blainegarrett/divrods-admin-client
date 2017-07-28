import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';
import RulesetRulesContent from './RulesetRulesContent';

class RulesetsRulesIndexPage extends Component {
    render() {
        return (
            <div>
                <h2>Rules</h2>
                <RulesetRulesContent ruleset_id={ this.props.match.params.ruleset_id }/>
            </div>
        );
    }
}
export default loginRequired('admin')(RulesetsRulesIndexPage);

RulesetsRulesIndexPage.propTypes = { }