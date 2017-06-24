/* Browser entry point into client code */

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import withScroll from 'scroll-behavior';

import Root from '../containers/Root';
import configureStore from '../store/configureStore';
import apiClient from '../apiClient';
import {set_page, record} from '../analytics';
import GoogleMapsLoader from 'google-maps';
import {GOOGLE_MAPS_API_KEY} from '../constants';
import { create_tracker } from '../analytics';

// Client specific setup
global.__CLIENT__ = true;
global.__SERVER__ = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__PRODUCTION__ = !global.__DEVELOPMENT__;


// Define Globals available only to the Browser Client
global.GoogleMapsLoader = GoogleMapsLoader;
global.GoogleMapsLoader.KEY = GOOGLE_MAPS_API_KEY;

// Setup Google Analytics
create_tracker();

const client = new apiClient();
const initialState = window.__INITIAL_STATE__;
const scrollHistory = withScroll(browserHistory);
const store = configureStore(initialState, scrollHistory, client);
const history = syncHistoryWithStore(scrollHistory, store);

history.listen(function(location) {
    // Add listener function to record pageview analytics
    setTimeout(function() {
        // Set timeout so that the doc title has been updated by Helmet
        set_page(location.pathname, global.document.title);
        record('pageView', { title: global.document.title });
    }, 1000);
})


const rootElement = document.getElementById('app');

// Mount React core component
render(<Root store={store} history={history} asyncHelpers={{client}}/>, rootElement);


console.log("      _                                               _        ");
console.log("    _| (_)_   _(_)_ __ (_)_ __   __ _   _ __ ___   __| |___    ");
console.log("  / _  | \\ \\ / / | '_ \\| | '_ \\ / _` | | '__/ _ \\ / _  / __|   ");
console.log(" | (_| | |\\ V /| | | | | | | | | (_| | | | | (_) | (_| \\__ \\   ");
console.log("  \\__,_|_| \\_/ |_|_| |_|_|_| |_|\\__, | |_|  \\___/ \\__,_|___/   ");
console.log("                                |___/                          ");