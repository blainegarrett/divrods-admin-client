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


// Fetches data for a User : user data + starred repos
export function* watchLogoutAction() {
  while(true) {
    yield take(LOGOUT); // return value is {type:LOGOUT}

    // Clear Local Storage
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
  }
}

export function* watchLoginAction() {
  while(true) {
    const action = yield take(LOGIN);
    // TODO: This only works for username/pw combos
    //const username = action.username;
    //const password = action.password;
    //console.log([username, password]);

    yield fork(authenticate, action);

    // TODO: Send log that the user logged out to server (?)
    // fork(recordLogoutAudit)
    // TODO: Redirect to /
  }
}

export function* watchAuthenticationSuccess() {
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
  yield call(fetchUser, provider_data);
}