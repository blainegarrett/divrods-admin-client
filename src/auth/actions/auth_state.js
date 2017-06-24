import {initializeAuthServices, requestSignIn, onAuthenticationSuccess, onDeauthenticationSuccess} from './../commands/global';
import { PREF_SERVICE_DOMAIN } from '../../constants';

export const SIGNIN_REQUEST = 'AUTH:SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'AUTH:SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'AUTH:SIGNIN_FAILURE';

export const SIGNOUT_REQUEST = 'AUTH:SIGNOUT_REQUEST';
export const SIGNOUT_SUCCESS = 'AUTH:SIGNOUT_SUCCESS';
export const SIGNOUT_FAILURE = 'AUTH:SIGNOUT_FAILURE';


export function authenticateNativeUserByServiceTokenId(auth_type, id_token) {
  // Call the server to create session for this user (aka. SignIn)

  if (!id_token) { // Service initialized, but user is not logged in to that service?
    console.log('NO ID TOKEN GIVEN');
    return;
  }

  return {
    types: [ SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE ],
    promise: (client) => {
      const data = {auth_type: auth_type, id_token: id_token};
      return client.post(PREF_SERVICE_DOMAIN + '/api/auth/authenticate', {data: data, callback: onAuthenticationSuccess});
    }
  }
}

export function initAuthServices() {
  /// Initialize all external auth services.
  /// If the user is auth'd with the service, we'll attempt to sign them in
  ///  in the callback (i.e. authenticateNativeUserByServiceTokenId)

  // A thunk func
  return function(dispatch, getState) {

    console.log('YEP?')
    // TODO: Check last poll timestamp on the store before attempting poll
    initializeAuthServices(function(service_type, id_token) {

      // TODO: Check if they're already auth'd and have a non-expired token
      //const state = getState();
      //console.log(state.authStateStore);
      console.log(service_type);

      dispatch(authenticateNativeUserByServiceTokenId(service_type, id_token));
    },
    function() {
      // error callback
      console.log('toaster strudal');
    });
  }
}

export function requestSignOut() { // AKA deauthenticate
  // TODO: Logout of each of the services too
  return {
    types: [ SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE ],
    promise: (client) => {
      return client.post(PREF_SERVICE_DOMAIN + '/api/auth/deauthenticate', {callback: onDeauthenticationSuccess});
    }
  }
}

export function signOut() {
  return requestSignOut();
}

export function signIn(auth_type) {
  // Initiate signIn process for the given service type
  // TODO: This probably eventually should keep track of state similar to requestSignOut above
  return function(dispatch, getState) {
    // Return a thunk func
    console.log("inside signIn thunk func");

    requestSignIn(dispatch, auth_type);
  }
}
