// Authentication State Reducers

import {SIGNIN_REQUEST} from './../actions/auth_state';
import {SIGNIN_SUCCESS} from './../actions/auth_state';
import {SIGNIN_FAILURE} from './../actions/auth_state';

import {SIGNOUT_REQUEST} from './../actions/auth_state';
import {SIGNOUT_SUCCESS} from './../actions/auth_state';
import {SIGNOUT_FAILURE} from './../actions/auth_state';


// TODO: If auth_token in local storage, default with those bits
const initialState = {
  loading: false,
  is_member: false,
  is_signed_in: false,
  user_resource_id: null,
  profile: null
}

export default function authStateStore(state=initialState, action) {

  switch(action.type) {

    case SIGNIN_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        is_member: false,
        is_signed_in: false,
        user_resource_id: null,
        profile: null
      });
    }
    case SIGNIN_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        is_member: action.result.results.is_member,
        is_signed_in: true,
        user_resource_id: action.result.results.resource_id,
        profile: action.result.results
      });
    }
    case SIGNIN_FAILURE: {
      console.log('SIGNIN FAIL');
      return state;
    }
    case SIGNOUT_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
      });
    }
    case SIGNOUT_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        is_signed_in: false,
        user_resource_id: null,
        profile: null
      });
    }
    case SIGNOUT_FAILURE: {
      console.log('SIGNOUT FAIL');
      return state;
    }
    default: {
      return state
    }
  }
}

