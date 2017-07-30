// A set of reusable react toolbox extensions
import React, { Component } from 'react';
import { Toolbar, ButtonGroup } from '../../react-toolbox-extensions';
import CreateUserAction from './CreateUserAction';

export default class UsersActionToolbar extends Component {
    render() {
        const rightButtonGroup = (
            <ButtonGroup>
                <CreateUserAction />
            </ButtonGroup>
        );

        return (<Toolbar rightButtonGroup={rightButtonGroup}/>);
    }
}