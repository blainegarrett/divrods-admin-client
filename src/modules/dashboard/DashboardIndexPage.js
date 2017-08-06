import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';
import { Link } from 'react-router-dom';

class DashboardIndexPage extends Component {
  render() {
    return (
      <div>
        <h2>Welcome</h2>
        <p>Welcome to the Divrods admin page. Some points of interest:</p>
        <ul>
          <li><Link to="/taggedart">Browse Currently Tagged Artwork</Link></li>
          <li><Link to="/preferences">Browse Preference Data</Link></li>
          <li><Link to="/rulesets">Browse and Generate Reccommendation Rules</Link></li>
        </ul>
      </div>
    );
  }
}
export default loginRequired('admin')(DashboardIndexPage);
DashboardIndexPage.propTypes = { }