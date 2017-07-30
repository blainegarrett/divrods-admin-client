// Sagas for the auth system
// Be sure to add your saga to registeredSagas that is exported as default at the end of the file

import { take, call, fork, select } from 'redux-saga/effects';
import { LOAD_USERS_PAGE, SET_PASSWORD, USERS, CREATE_USER, INITIATE_CREATE_USER, AUTHENTICATE, LOGOUT, LOGIN } from './actions';
import { pref_service_client } from '../services';
import { jive, fetchEntity } from '../redux/sagas'; // Circular dependency...?
import { async_call_mapper } from '../redux/actions';

// Bind async api fetchers
export const fetchUser    = fetchEntity.bind(null, async_call_mapper(AUTHENTICATE), pref_service_client.fetchUser)
export const createUser   = fetchEntity.bind(null, async_call_mapper(CREATE_USER), pref_service_client.createUser)
export const fetchUsers   = fetchEntity.bind(null, async_call_mapper(USERS), pref_service_client.fetchUsers)
export const setPassword  = fetchEntity.bind(null, async_call_mapper(SET_PASSWORD), pref_service_client.setPassword)

// Load Load a page of users - note: page size is staticly defined in pref_service_client
function* loadUsers(next_cursor, force_refresh=false) {
  const loaded = yield select(jive, "auth_users", "all", next_cursor, force_refresh)
  if (!loaded) {
    yield call(fetchUsers, {next_cursor});
  }
}

// Watch for Logout attempt
export function* watchLogoutAction() {
  while(true) {
    yield take(LOGOUT); // return value is {type:LOGOUT}

    // Clear Local Storage
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
  }
}

export function* watchLoginAction() {
  // Watch for login attempts (i.e. submitting login form)
  while(true) {
    const action = yield take(LOGIN);
    yield fork(authenticate, action);
  }
}

export function* watchAuthenticationSuccess() {
  // Watch for successful login attempt and update credentials

  while(true) {
    const action = yield take(AUTHENTICATE.SUCCESS);

    // Set Local Storage
    localStorage.setItem('id_token', action.response.results.id_token);
    localStorage.setItem('access_token', action.response.results.access_token);
  }
}

export function* authenticate(data) {
  // TODO: Case out by auth provider
  const hash = window.btoa(data.username + ":" + data.password)
  const provider_data = {'auth_token': hash, 'auth_type': 'basic'};
  yield call(fetchUser, {provider_data});
}

export function* watchInitiateCreateUserAction() {
  while(true) {
    // Form params..
    const {username, first_name, last_name, email, password} = yield take(INITIATE_CREATE_USER);

    yield fork(createUser, {username, first_name, last_name, email, password});
  }
}

export function* watchCreateUserSuccess() {
  // Watch for successful login attempt and update credentials

  while(true) {
    const success_action = yield take(CREATE_USER.SUCCESS);

    let password = success_action.password;
    let user_resource_id = success_action.response.results.resource_id;
    // Force reload the index of items - triggers grid to reload
    yield fork(loadUsers, undefined, true);

    yield fork(setPassword, {user_resource_id, password});
  }
}


export function* watchLoadAuthUsersPage() {
  while(true) {
    const {next_cursor} = yield take(LOAD_USERS_PAGE);
    yield fork(loadUsers, next_cursor);
  }
}

// Easiliy indexable list of all sagas
const registeredSagas = [
  fork(watchLoadAuthUsersPage),
  fork(watchCreateUserSuccess),
  fork(watchInitiateCreateUserAction),
  fork(watchLogoutAction),
  fork(watchLoginAction),
  fork(watchAuthenticationSuccess)
];

export default registeredSagas;