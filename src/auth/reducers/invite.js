// Auth Invite handlers

import {INVITE_GET_REQUEST} from './../actions/invite';
import {INVITE_GET_SUCCESS} from './../actions/invite';
import {INVITE_GET_FAILURE} from './../actions/invite';

const initialState = {
  loading:false,
  failure: false,
  resource: null
}

export default function authInviteAcceptStore(state=initialState, action) {

  // action.result.results is an AuthInvite
  switch(action.type) {

    case INVITE_GET_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        failure: false,
        is_member: false,
        is_signed_in: false,
        user_resource_id: null,
        resource: null
      });
    }
    case INVITE_GET_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        failure: false,
        is_member: action.result.results.is_member,
        is_signed_in: true,
        user_resource_id: action.result.results.resource_id,
        resource: action.result.results
      });
    }
    case INVITE_GET_FAILURE: {
      console.log(action)
      return Object.assign({}, state, {
        loading: false,
        failure: true
      });
    }
    default: {
      return state
    }
  }
}

