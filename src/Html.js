import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the ./server/server.js file.
 */

export default class Html extends Component {
  render() {
    const {component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';

    const head = Helmet.rewind();

    return (
      <html lang="en">
        <head>
          { head.title.toComponent() }
          { head.meta.toComponent() }
          { head.link.toComponent() }

          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" href="/static/themes/v0/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="propeller" content="3bd7b9fa4ea9ab50edfd876680096776" />

          <link href="/static/Bryant2Web/Bryant2Web_WOFF/Bryant.css" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />

          <link href="/static/styles.css" rel="stylesheet" type="text/css" />

          <meta name="google-signin-client_id" content="945216243808-km8edqr2dp8etek3camju5dmrj7peai8.apps.googleusercontent.com" />
          <meta name="google-site-verification" content="5rh0RiNkYuPuVOdrIXk4mY4AQ87uS7Ad_ZigdjDNBp0" />

        </head>

        <body>

          <div id="app" dangerouslySetInnerHTML={{__html: content}} />
          <script dangerouslySetInnerHTML={{__html: `__INITIAL_STATE__=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src="//www.google-analytics.com/analytics.js"></script>
          <script src="/static/bundle.js"></script>

        </body>

      </html>
    )
  }
}

Html.propTypes = {
  component: PropTypes.node,
  store: PropTypes.object
};