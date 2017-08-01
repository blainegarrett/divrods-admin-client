// reducers.js

import { AUTHENTICATE, LOGOUT, CREATE_USER } from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
let defaultAuthState = {
  isFetching: false,
  isAuthenticated: false,
};

defaultAuthState.isAuthenticated = localStorage.getItem('access_token') ? true : false;

export function authStateReducer(state = defaultAuthState, action) {
  // If we had an async request that failed
  // TODO: Base this off status code 401?
  if (action.error && (action.error === 'Authentication Required' ||
      action.error === 'Authentication Failed')
    ) {
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: 'You\'re session timed out or is invalid. Please login again.'
    })
  }

  switch (action.type) {
    case AUTHENTICATE.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case AUTHENTICATE.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case AUTHENTICATE.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.error
      })
    case LOGOUT: // <-- this is dangerous. it isn't the success, just that they triggered the process...
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}

export function createUserFormState(state={async_success: false, error_message:null}, action) {
  switch(action.type) {
    case CREATE_USER.SUCCESS:
      const new_state = {
        async_success: true,
        error_message: ''
      }
      return new_state;

    case CREATE_USER.FAILURE:
      const fail_state = {
        async_success: false,
        error_message: action.error
      }
      return fail_state;
    default:
      return state
  }
}