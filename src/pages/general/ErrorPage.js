import React from 'react';
import PageBase from '../PageBase';
import PageLink from '../../containers/PageLink';

class ErrorPage extends PageBase {
  populate_meta() {
    this.meta.title = 'Page Not Found'
    this.meta.description = 'The page You were looking for could not be found'
  }

  renderPage() {
    return (
      <div>
        <h2>Page Not Found</h2>
        <p>We could not find the page you requested. Please head back to our <PageLink to="/">homepage.</PageLink></p>
      </div>
    );
  }
}

export default ErrorPage;
