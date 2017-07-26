// reducers.js

import { AUTHENTICATE, LOGOUT } from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
let defaultAuthState = {
  isFetching: false,
  isAuthenticated: false,
};

defaultAuthState.isAuthenticated = localStorage.getItem('access_token') ? true : false;

export function authStateReducer(state = defaultAuthState, action) {
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