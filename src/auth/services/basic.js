// Google Auth Flow Process

import {AUTH_TYPES} from '../constants';

export function initialize(onSuccess, onFailure) {

  console.log('Initializing Basic Auth');
  var id_token = 'JAZZHANDS';
  onSuccess(AUTH_TYPES.BASIC, id_token);
}

export function signIn(dispatch, onSuccess, onFailure) {
  // Sign In To Google
  // We need access to store or something to get the token...
  console.log("Attempting Signin Process");

  var id_token = 'JAZZHANDS';

  onSuccess({auth_type:AUTH_TYPES.BASIC, id_token:id_token});
}

export function signOut(dispatch){
    // Sign out of Google

  console.log("basic signout  process");
}