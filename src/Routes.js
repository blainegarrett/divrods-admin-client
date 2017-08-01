// Top Level Routes (note with react router 4, routes may appear anywhere)

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import {AuthUsersIndexPage} from './xauth/pages'
import NotFoundPage from './components/pages/NotFoundPage'
import {SessionsIndexPage} from './modules/sessions';
import {RulesetsIndexPage} from './modules/rulesets';
import {RulesetsRulesIndexPage} from './modules/ruleset_rules';
import {ItemsIndexPage} from './modules/items';
import {PreferencesIndexPage} from './modules/preferences';
import {DashboardIndexPage} from './modules/dashboard';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={DashboardIndexPage} />
        <Route exact path="/rulesets" component={RulesetsIndexPage} />
        <Route exact path="/rulesets/:ruleset_id" component={RulesetsRulesIndexPage} />
        <Route exact path="/preferences" component={PreferencesIndexPage} />
        <Route exact path="/items" component={ItemsIndexPage} />
        <Route exact path="/sessions" component={SessionsIndexPage} />
        <Route exact path="/auth/users" component={AuthUsersIndexPage} />
        <Route component={NotFoundPage}/>
      </Switch>
    );
  }
}