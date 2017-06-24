import { requestAcceptInviteWorkflow } from './../commands/global';

// Invites
export const INVITE_GET_REQUEST = 'AUTH:INVITE_GET_REQUEST';
export const INVITE_GET_SUCCESS = 'AUTH:INVITE_GET_SUCCESS';
export const INVITE_GET_FAILURE = 'AUTH:INVITE_GET_FAILURE';

import { API_DOMAIN } from '../../constants';

export function requestInvite(invite_resource_id, token) {

  // TODO: Logout of each of the services too
  return {
    types: [ INVITE_GET_REQUEST, INVITE_GET_SUCCESS, INVITE_GET_FAILURE ],
    promise: (client) => {
      return client.get(API_DOMAIN + '/api/auth/invites/' + invite_resource_id + '?token=' + token);
    }
  }
}

export function initAcceptInviteWorkflow(auth_type, invite_resource_id, token, dispatch) {
  requestAcceptInviteWorkflow(auth_type, invite_resource_id, token, dispatch);
}

export function requestAcceptInvite(invite_resource_id, token, auth_type, id_token) {
  return {
    types: [ INVITE_GET_REQUEST, INVITE_GET_SUCCESS, INVITE_GET_FAILURE ],
    promise: (client) => {
      return client.post(API_DOMAIN + '/api/auth/invites/' + invite_resource_id + '?token=' + token + '&auth_type=' + auth_type + '&id_token=' + id_token);
    }
  }
}