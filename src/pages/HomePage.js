import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageBase from './PageBase';
import connect from 'react-redux/lib/components/connect';
import { asyncConnect } from 'redux-connect';
import { fetchUpcomingEvents, getUpcomingEvents, fetchFeaturedResources, getFeaturedResources } from './../actions';
import Footer from './../components/layout/Footer';
import WaterFallContainer from './../components/layout/WaterFallContainer';
import FeaturedHeroPanel from './../components/layout/FeaturedHeroPanel';
import {Row} from '../lib/grid';
import {HOMEPAGE_2} from '../modules/adverts/adspots';
import { loginRequired } from '../xauth/decorators';

function mapStateToProps(state, ownProps) {
  let resources = Object.assign([], getUpcomingEvents(state));
  resources.splice(2, 0, {resource_type: 'Advert', adspot_id: HOMEPAGE_2});

  return {
    events: resources,
    featured: getFeaturedResources(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const state = getState();
    const promises = [];

    promises.push(dispatch(fetchUpcomingEvents(state)));
    promises.push(dispatch(fetchFeaturedResources(state)));
    return Promise.all(promises)
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
@loginRequired('admin')
export default class HomePage extends PageBase {
  populate_meta() {
    this.meta.title = 'Make a Scene'
    this.meta.description = 'The best visual art events in Minneapolis and St. Paul'
  }

  renderPage() {
    return (
      <div id="HomePageWrapper">
        <h2>Divining Rod Admin Home Page</h2>
        <p>Put something good here</p>
      </div>
    );
  }
}

