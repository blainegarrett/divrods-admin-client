import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';
import SurveyContent from './SurveyContent';

class SessionsIndexPage extends Component {
    render() {
        return (
            <div><h2>Survey</h2><SurveyContent /></div>
        );
    }
}
export default loginRequired('admin')(SessionsIndexPage);

SessionsIndexPage.propTypes = { }