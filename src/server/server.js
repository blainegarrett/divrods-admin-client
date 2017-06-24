// Server
import React from 'react';
import Express from 'express';
import { match } from 'react-router';
import { renderToString } from 'react-dom/server';

import createHistory from 'react-router/lib/createMemoryHistory';
import { loadOnServer } from 'redux-connect';
import configureStore from '../store/configureStore';

import Root from '../containers/Root';
import routes from '../routes';
import Html from '../Html';
import apiClient from '../apiClient';

// Define some global variables
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__PRODUCTION__ = !global.__DEVELOPMENT__;
global.navigator = { navigator: 'all' }; // For material-ui

const app = new Express();
const port = global.__PRODUCTION__ ? 8080 : process.env.PORT || 8000;

if (global.__DEVELOPMENT__) {
  var webpack = require('webpack');
  var webpackDevMiddleware  = require('webpack-dev-middleware');
  var webpackHotMiddleware  = require('webpack-hot-middleware');
  var webpackConfig  = require('../webpack.config');

  // Use this middleware to set up hot module reloading via webpack.
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// Temp (?) static asset loading - not HMR
app.use('/static', Express.static(__dirname + '/../../static'));

app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /admin/\nDisallow: /api/');
});

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {

  // Create a non-browser enabled history instance
  const history = createHistory(req.originalUrl);

  // Define an initial empty state for serverside rendering of isomorphic app
  const initialState = {};

  // Create instance of our api client to abstract REST interface
  const client = new apiClient(req);

  // Create a new Redux store instance
  const store = configureStore(initialState, history, client);

  // Attempt to match a ReactRouter Route to the given url
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    //console.log('----------- route match (' + req.url + ')---------------')
    //console.log(err);
    //console.log(redirectLocation);

    // Note: We never seem to hit case 1 nor 2 here regardless of what we do
    //  nor can we manually fire a 404 aside from a route not matching.
    if (err) {
      // Case 1: Server error
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      // Case 2: Redirect
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // Case 3: Success
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (<Root store={store} history={history} />);

        // Send the rendered page back to the client
        res.status(200);

        const renderedHtml = renderToString(<Html component={component} store={store}/>);
        //console.log(renderedHtml);
        res.send('<!doctype html>\n' + renderedHtml);
      });
    }
    else {
      // Case No Route Match
      // TODO: See if we can render a react page here
      res.status(404).send('Not found');
    }
  });
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});
