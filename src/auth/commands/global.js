// Global Auth commands

import {AUTH_TYPES} from '../constants';
import * as googleAuthService from '../services/google';
import * as basicAuthService from '../services/basic'
import { requestAcceptInvite } from '../actions/invite';
import { authenticateNativeUserByServiceTokenId} from '../actions/auth_state';
import { bindActionCreators } from 'redux';

// Registry of service helpers
const serviceRegistry = {}
//serviceRegistry[AUTH_TYPES.GOOGLE] = googleAuthService;
serviceRegistry[AUTH_TYPES.BASIC] = basicAuthService;

export function getService(auth_type) {
  if (serviceRegistry[auth_type]) {
    return serviceRegistry[auth_type];
  }

  console.error('Unknown Authentication Service: ' + auth_type + '. Add to auth.globals registry?');
}


export function initializeAuthServices(onSuccess, onError) {

  // Iterate over services and initialize
  for (var auth_type in serviceRegistry) {
    const service = getService(auth_type);
    console.log('PRE INIT?!!?!??');
    service.initialize(onSuccess, onError)
  }
}

export function requestSignIn(dispatch, auth_type) {
  const service = getService(auth_type);

  // TODO: How to better handle callbacks?
  service.signIn(dispatch, function (res) {
    console.log('SIGN IN SUCCESS via ' + auth_type);
    console.log(res);

    dispatch(authenticateNativeUserByServiceTokenId(res.auth_type, res.id_token))
  },

  function(dispatch, res) {
    console.log('SIGN IN FAIL via ' + auth_type);
    console.log(res);
  });
}

export function onAuthenticationSuccess(resp) {
  // Callback from successful authentication request
  // Do side effects here

  if (global.__CLIENT__) {
    localStorage.setItem('auth_token', resp.results.auth_token);
  }
}

export function onDeauthenticationSuccess() {
  // Callback from successful de-authentication request
  // Do side effects here

  if (global.__CLIENT__) {
    localStorage.removeItem('auth_token');
  }

  // Sign out of all services
  for (var auth_type in serviceRegistry) {
    const service = getService(auth_type);
    service.signOut()
  }
}

export function requestAcceptInviteWorkflow(auth_type, invite_resource_id, token, dispatch) {
  const service = getService(auth_type);

  console.log('HERE!!!!!!');
  // TODO: How to better handle callbacks?
  service.signIn(function (res) {
    console.log('INVITE SIGN IN SUCCESS via ' + auth_type);
    console.log(res);
    console.log('TODO: trigger accept flow action');
    console.log([auth_type, invite_resource_id, token]);
    console.log(res.tokenId);

    let id_token = res.tokenId;


    // Fire off request to mark invite as accepted

    var bound = bindActionCreators(requestAcceptInvite, dispatch)
    bound(invite_resource_id, token, auth_type, id_token);

  },

  function(res) {
    console.log('INVITE SIGN IN FAIL via ' + auth_type);
    console.log(res);
  });
}