// A set of reusable react toolbox extensions
import React, { Component } from 'react';
import { Toolbar, ButtonGroup } from '../../react-toolbox-extensions';
import GenerateRulesetAction from './GenerateRulesetAction';

export default class RulesetToolbar extends Component {
    render() {
        const rightButtonGroup = (
            <ButtonGroup>
                <GenerateRulesetAction />
            </ButtonGroup>
        );

        return (<Toolbar rightButtonGroup={rightButtonGroup}/>);
    }
}