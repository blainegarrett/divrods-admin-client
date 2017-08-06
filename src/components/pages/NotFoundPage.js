import React, { Component } from 'react';
import { loginRequired } from '../../xauth/decorators';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <h2>Page Not Found</h2>
        <p>Please return to the <a href="/">dashboard</a></p>
      </div>
    );
  }
}

export default loginRequired('admin')(NotFoundPage);
NotFoundPage.propTypes = { }