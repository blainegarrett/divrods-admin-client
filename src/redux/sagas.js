/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, all } from 'redux-saga/effects';
import { api } from '../services';
import { pref_service_client } from '../services';
import * as actions from './actions';


import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from './reducers/selectors';
import { watchLogoutAction, watchLoginAction, watchAuthenticationSuccess } from '../xauth/sagas';


// each entity defines 3 creators { request, success, failure }
const { repo, starred, stargazers } = actions;
const { user, prefs_async, rulesets_async, rules_async, users_async} = actions;

// url for first page
// urls for next pages will be extracted from the successive loadMore* requests
const firstPageStarredUrl = login => `users/${login}/starred`
const firstPageStargazersUrl = fullName => `repos/${fullName}/stargazers`


/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass id to apiFn
function* fetchEntity(entity, apiFn, id, url) {

  console.log([entity, apiFn, id, url]);

  yield put( entity.request(id) )
  const results = yield call(apiFn, id, url || '') //, url || id)
  const {response, error} = results;
  if(response)
    yield put( entity.success(id, response, url) )
  else
    yield put( entity.failure(id, error, url) )
}

// yeah! we can also bind Generators

// Rename this to something "authenticate"
export const fetchUser         = fetchEntity.bind(null, user, api.fetchUser)
export const fetchPrefs        = fetchEntity.bind(null, prefs_async, pref_service_client.fetchPrefs)
export const fetchRulesets     = fetchEntity.bind(null, rulesets_async, pref_service_client.fetchRulesets)
export const fetchRulesetRules = fetchEntity.bind(null, rules_async, pref_service_client.fetchRulesetRules)
export const fetchUsers        = fetchEntity.bind(null, users_async, pref_service_client.fetchUsers)


// Leftovers from sagas demo
export const fetchRepo       = fetchEntity.bind(null, repo, api.fetchRepo)
export const fetchStarred    = fetchEntity.bind(null, starred, api.fetchStarred)
export const fetchStargazers = fetchEntity.bind(null, stargazers, api.fetchStargazers)

//

function jive(state, index_name, index_subname, next_cursor) {

  console.log([index_name, index_subname, next_cursor]);

  const next_cursor_index = next_cursor || 'start';
  if (state.pagination[index_name] &&
      state.pagination[index_name][index_subname] &&
      state.pagination[index_name][index_subname].cursors[next_cursor_index]) {

    console.log("shit is loaded mother fucker!!!!!!!!");
    return true;
  }
    console.log("shit was def not loaded already...");
  return false;
}

function* loadPrefs(next_cursor) {
  // TODO: Check to see if we have data for this cursor
  const loaded = yield select(jive, "prefs", "all", next_cursor)
  if (!loaded) {
    yield call(fetchPrefs, next_cursor);
  }
}

function* loadRulesets(next_cursor) {
  // TODO: Check to see if we have data for this cursor
  const loaded = yield select(jive, "rulesets", "all", next_cursor)
  if (!loaded) {
    yield call(fetchRulesets, next_cursor);
  }
}
function* loadRulesetRules(ruleset_id, next_cursor) {
  // TODO: Check to see if we have data for this cursor
  const loaded = yield select(jive, "ruleset_rules", ruleset_id, next_cursor)
  if (!loaded) {
    yield call(fetchRulesetRules, ruleset_id, next_cursor);
  }
}
function* loadUsers(next_cursor) {
   // TODO: Check to see if we have data for this cursor
  const loaded = yield select(jive, "auth_users", "all", next_cursor)
  if (!loaded) {
    yield call(fetchUsers, next_cursor);
  }
}




// load user unless it is cached
function* loadUser(login, requiredFields) {
  const user = yield select(getUser, login)
  if (!user || requiredFields.some(key => !user.hasOwnProperty(key))) {
    yield call(fetchUser, login)
  }
}

// load repo unless it is cached
function* loadRepo(fullName, requiredFields) {
  const repo = yield select(getRepo, fullName)
  if (!repo || requiredFields.some(key => !repo.hasOwnProperty(key)))
    yield call(fetchRepo, fullName)
}

// load next page of repos starred by this user unless it is cached
function* loadStarred(login, loadMore) {
  const starredByUser = yield select(getStarredByUser, login)
  if (!starredByUser || !starredByUser.pageCount || loadMore)
    yield call(
      fetchStarred,
      login,
      starredByUser.nextPageUrl || firstPageStarredUrl(login)
    )
}

// load next page of users who starred this repo unless it is cached
function* loadStargazers(fullName, loadMore) {
  const stargazersByRepo = yield select(getStargazersByRepo, fullName)
  if (!stargazersByRepo || !stargazersByRepo.pageCount || loadMore)
    yield call(
      fetchStargazers,
      fullName,
      stargazersByRepo.nextPageUrl || firstPageStargazersUrl(fullName)
    )
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

function* watchLoadAuthUsersPage() {
  while(true) {
    const {more, next_cursor} = yield take(actions.LOAD_USERS_PAGE);
    yield fork(loadUsers, next_cursor);
  }
}




// Fetches data for a User : user data + starred repos
function* watchLoadUserPage() {
  while(true) {
    const {login, requiredFields = []} = yield take(actions.LOAD_USER_PAGE)
    yield fork(loadUser, login, requiredFields)
    yield fork(loadStarred, login)
  }
}

// Fetches data for a Repo: repo data + repo stargazers
function* watchLoadRepoPage() {
  while(true) {
    const {fullName, requiredFields = []} = yield take(actions.LOAD_REPO_PAGE)

    yield fork(loadRepo, fullName, requiredFields)
    yield fork(loadStargazers, fullName)
  }
}

// Fetches more starred repos, use pagination data from getStarredByUser(login)
function* watchLoadMoreStarred() {
  while(true) {
    const {login} = yield take(actions.LOAD_MORE_STARRED)
    yield fork(loadStarred, login, true)
  }
}

function* watchLoadMoreStargazers() {
  while(true) {
    const {fullName} = yield take(actions.LOAD_MORE_STARGAZERS)
    yield fork(loadStargazers, fullName, true)
  }
}

export default function* root() {
  yield all([
    fork(watchLoadPrefsPage),
    fork(watchLoadRulesetsPage),
    fork(watchLoadRulesetRulesPage),
    fork(watchLoadAuthUsersPage),
    fork(watchAuthenticationSuccess),
    fork(watchLoginAction),
    fork(watchLogoutAction),
  ])
}
