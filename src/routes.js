import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import AuthSignInPage from './pages/auth/AuthSignInPage';
import {RulesetsPageShell, RulesetsListViewPage, RulesListView} from './pages/rulesets';
import HomePage from './pages/HomePage';
import { PreferencesPageShell, ListViewPage } from './pages/preferences';


// NOTE: BE SURE TO dupe these routes in dispatch.yaml and `make dispatch` in the api project
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="preferences" component={PreferencesPageShell}>
        <IndexRoute component={ListViewPage}/>
    </Route>

    <Route path="rulesets" component={RulesetsPageShell}>
        <IndexRoute component={RulesetsListViewPage}/>
        <Route path=":ruleset_id" component={RulesListView} />
    </Route>
    <Route path="auth/signin" component={AuthSignInPage} />
  </Route>
)