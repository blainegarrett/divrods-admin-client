import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';


class SettingsEnvironmentPage extends Component {
  render() {
    return (
      <div>
        <h2>Environment Variables</h2>
        <p>Below are build time environment settings useful for debugging. </p>

        <pre>
            { JSON.stringify(process.env, null, 2) }
        </pre>

        <p>Note: To change these variables, update them in the appropriate .env* file and re-deploy</p>

      </div>
    );
  }
}


export default loginRequired('admin')(SettingsEnvironmentPage);
SettingsEnvironmentPage.propTypes = { }