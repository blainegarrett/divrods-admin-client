/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, all } from 'redux-saga/effects';
import { pref_service_client } from '../services';
import * as actions from './actions';

import { watchLoadAuthUsersPage, watchCreateUserSuccess, watchInitiateCreateUserAction, watchLogoutAction, watchLoginAction, watchAuthenticationSuccess } from '../xauth/sagas';

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
export const fetchPrefs        = fetchEntity.bind(null, actions.async_call_mapper(actions.PREFS), pref_service_client.fetchPrefs)
export const fetchRulesets     = fetchEntity.bind(null, actions.async_call_mapper(actions.RULESETS), pref_service_client.fetchRulesets)
export const fetchRulesetRules = fetchEntity.bind(null, actions.async_call_mapper(actions.RULES), pref_service_client.fetchRulesetRules)


export const generateRuleset   = fetchEntity.bind(null, actions.async_call_mapper(actions.GENERATE_RULESET), pref_service_client.generateRuleset)

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
  // TODO: Check to see if we have data for this cursor

  const loaded = yield select(jive, "prefs", "all", next_cursor, force_refresh)
  if (!loaded) {
    yield call(fetchPrefs, {next_cursor});
  }
}

function* loadRulesets(next_cursor, force_refresh=false) {
  // TODO: Check to see if we have data for this cursor
  const loaded = yield select(jive, "rulesets", "all", next_cursor, force_refresh)
  if (!loaded) {
    yield call(fetchRulesets, {next_cursor});
  }
}
function* loadRulesetRules(ruleset_id, next_cursor, force_refresh=false) {
  // TODO: Check to see if we have data for this cursor
  const loaded = yield select(jive, "ruleset_rules", ruleset_id, next_cursor, force_refresh)
  if (!loaded) {
    yield call(fetchRulesetRules, {ruleset_id, next_cursor});
  }
}




/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

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

    // Force reload the index of items - triggers grid to reload
    yield fork(loadRulesets, undefined, true);
  }
}

export default function* root() {
  yield all([
    fork(watchInitiateGenerateRulesAction),
    fork(watchGenerateRulesActionSuccess),
    fork(watchInitiateCreateUserAction),
    fork(watchCreateUserSuccess),
    fork(watchLoadPrefsPage),
    fork(watchLoadRulesetsPage),
    fork(watchLoadRulesetRulesPage),
    fork(watchLoadAuthUsersPage),
    fork(watchAuthenticationSuccess),
    fork(watchLoginAction),
    fork(watchLogoutAction),
  ])
}
