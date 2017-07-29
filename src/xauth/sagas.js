// Be sure to register your sagas with the root sagas...

import { take, put, call, fork } from 'redux-saga/effects';
import { AUTHENTICATE, LOGOUT, LOGIN, user } from './actions';
import { pref_service_client } from '../services';


// This is cloned from the saga demo... consider moving somewhere good
function* fetchEntity(entity, apiFn, id, url) {
  yield put( entity.request(id) )
  const {response, error} = yield call(apiFn, url || id)
  if(response)
    yield put( entity.success(id, response) )
  else
    yield put( entity.failure(id, error) )
}

// Bind fetches
export const fetchUser = fetchEntity.bind(null, user, pref_service_client.fetchUser)


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