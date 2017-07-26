//https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
// actions.js

// Also see sagas real-world example

import { action, createRequestTypes } from '../redux/actions';

// ASYNC Actions
export const AUTH_LOGOUT = createRequestTypes('AUTH_LOGOUT');
export const AUTHENTICATE = createRequestTypes('AUTHENTICATE');

// Other Actions
export const LOGOUT = 'LOGOUT'; // When someone clicks the logout button
export const LOGIN = 'LOGIN'; // When someone clicks the loging button


// AsyncAction Wrappers
// Rename this
export const user = {
  request: login => action(AUTHENTICATE.REQUEST, {login}),
  success: (login, response) => action(AUTHENTICATE.SUCCESS, {login, response}),
  failure: (login, error) => action(AUTHENTICATE.FAILURE, {login, error}),
}


// Commands
export function logoutUser() {
  // Intiate logout flow
  return action(LOGOUT, {});
}

export function loginUser(creds) {
  // Initiate login flow
  return action(LOGIN, creds);
}