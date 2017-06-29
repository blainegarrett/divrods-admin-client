// Top Level Routes (note with react router 4, routes may appear anywhere)

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {SessionsIndexPage} from './modules/sessions';
import {RulesetsIndexPage} from './modules/rulesets';
import {ItemsIndexPage} from './modules/items';
import {PreferencesIndexPage} from './modules/preferences';
import {DashboardIndexPage} from './modules/dashboard';

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={DashboardIndexPage} />
        <Route exact path="/rulesets" component={RulesetsIndexPage} />
        <Route exact path="/preferences" component={PreferencesIndexPage} />
        <Route exact path="/items" component={ItemsIndexPage} />
        <Route exact path="/sessions" component={SessionsIndexPage} />
      </div>
    );
  }
}