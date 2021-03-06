/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { push } from 'react-router-redux';

import { pref_service_client } from '../services';
import * as actions from './actions';

import xauthSagas from '../xauth/sagas';
import { sagas as itemSagas } from '../modules/items/redux';
import { sagas as sessionSagas } from '../modules/sessions/redux';
import { sagas as miacollectionsSagas } from '../modules/miacollections';
import { sagas as utilityServiceSagas } from '../modules/utility';
import { sagas as surveySagas} from '../modules/survey/redux';
/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity : asyncActionMap - eg.result of actions.async_call_mapper(actions.USER)
// apiFn  : supporting api method eg. pref_service_client.fetchPrefs
// args   : object of arguments passed to the generator on to the apiFn and ultimatly to action
export function* fetchEntity(asyncActionMap, apiFn, ...args) {
  if (!apiFn || typeof apiFn !== 'function') {
    throw new Error('api function is undefined or not of type function.')
  }

  yield put( asyncActionMap.request(...args))
  const results = yield call(apiFn, ...args)
  const {response, error} = results;

  if(response)
    yield put( asyncActionMap.success(response, ...args) )
  else
    yield put( asyncActionMap.failure(error, ...args) )
}

// Bind Generators - TODO: Document the crap out of this
export const fetchPrefs        = fetchEntity.bind(null, actions.async_call_mapper(actions.PREFS), pref_service_client.fetchPrefs);
export const fetchRulesets     = fetchEntity.bind(null, actions.async_call_mapper(actions.RULESETS), pref_service_client.fetchRulesets);
export const fetchRulesetRules = fetchEntity.bind(null, actions.async_call_mapper(actions.RULES), pref_service_client.fetchRulesetRules);

export const generateRuleset   = fetchEntity.bind(null, actions.async_call_mapper(actions.GENERATE_RULESET), pref_service_client.generateRuleset);
export const makeRulesetDefault = fetchEntity.bind(null, actions.async_call_mapper(actions.MAKE_RULESET_DEFAULT), pref_service_client.setRulesetDefault);

export const putPreference = fetchEntity.bind(null, actions.async_call_mapper(actions.PUT_PREFERENCE), pref_service_client.putPreference);

export function jive(state, index_name, index_subname, next_cursor, force_refresh=false) {
  // TODO: This works for pagination, but not for individual entities...
  if (force_refresh) {
    return false;
  }
  const next_cursor_index = next_cursor || 'start';
  if (state.pagination[index_name] &&
      state.pagination[index_name][index_subname] &&
      state.pagination[index_name][index_subname].cursors[next_cursor_index]) {
    return true;
  }
  return false;
}

function* loadPrefs(next_cursor, force_refresh=false) {
  const loaded = yield select(jive, 'prefs', 'all', next_cursor, force_refresh)
  if (!loaded) {
    yield call(fetchPrefs, {next_cursor});
  }
}

function* loadRulesets(next_cursor, force_refresh=false) {
  const loaded = yield select(jive, 'rulesets', 'all', next_cursor, force_refresh)
  if (!loaded) {
    yield call(fetchRulesets, {next_cursor});
  }
}

function* loadRulesetRules(ruleset_id, next_cursor, force_refresh=false) {
  const loaded = yield select(jive, 'ruleset_rules', ruleset_id, next_cursor, force_refresh)
  if (!loaded) {
    yield call(fetchRulesetRules, {ruleset_id, next_cursor});
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/
function* watchNavigate() {
  while(true) {
    const {pathname} = yield take(actions.NAVIGATE)
    yield put(push(pathname));
  }
}

function* watchLoadPrefsPage() {
  while(true) {
    const {next_cursor} = yield take(actions.LOAD_PREFS_PAGE);
    yield fork(loadPrefs, next_cursor);
  }
}

function* watchLoadRulesetsPage() {
  while(true) {
    const {next_cursor} = yield take(actions.LOAD_RULESETS_PAGE);
    yield fork(loadRulesets, next_cursor);
  }
}

function* watchLoadRulesetRulesPage() {
  while(true) {
    const {next_cursor, ruleset_id} = yield take(actions.LOAD_RULES_PAGE);
    yield fork(loadRulesetRules, ruleset_id, next_cursor);
  }
}


function* watchInitiateGenerateRulesAction() {
  while(true) {
    // Form params..
    const {min_support, min_confidence, make_default} = yield take(actions.INITIATE_GENERATE_RULES);
    yield fork(generateRuleset, {min_support, min_confidence, make_default});
  }
}

function* watchGenerateRulesActionSuccess() {
  while(true) {
    yield take(actions.GENERATE_RULESET.SUCCESS);

    yield call(delay, 1000);

    // Force reload the index of items - triggers grid to reload
    yield fork(loadRulesets, undefined, true);
  }
}

function* watchInitiateMakeRulesetDefaultAction() {
  while(true) {
    // Form params..
    const {ruleset_resource_id} = yield take(actions.INITIATE_MAKE_RULESET_DEFAULT);
    yield fork(makeRulesetDefault, {ruleset_resource_id});
  }
}


function* watchMakeRulesetDefaultSuccess() {
  while(true) {
    // Once succes response, wait 1 second, reload the data, and close the form
    const action = yield take(actions.MAKE_RULESET_DEFAULT.SUCCESS);
    yield call(delay, 1000);
    yield fork(loadRulesets, undefined, true);
    yield put(actions.action('RESETFORMSTATE', {formstateId: action.ruleset_resource_id}));
  }
}

function* watchInitiatePutPreferenceAction() {
  /** Trigger api call to record a preference
  */
  while(true) {
    const {user_id, item_id, pref} = yield take(actions.INITIATE_PUT_PREFERENCE);
    yield fork(putPreference, {user_id, item_id, pref});
  }
}


export default function* root() {
  yield all([
    ...xauthSagas,
    ...miacollectionsSagas,
    ...utilityServiceSagas,
    ...itemSagas,
    ...sessionSagas,
    ...surveySagas,
    fork(watchNavigate),
    fork(watchInitiateGenerateRulesAction),
    fork(watchGenerateRulesActionSuccess),
    fork(watchLoadPrefsPage),
    fork(watchLoadRulesetsPage),
    fork(watchLoadRulesetRulesPage),
    fork(watchInitiateMakeRulesetDefaultAction),
    fork(watchMakeRulesetDefaultSuccess),
    fork(watchInitiatePutPreferenceAction),
  ])
}
