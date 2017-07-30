//https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
// actions.js

// Also see sagas real-world example

import { action, createRequestTypes } from '../redux/actions';

// ASYNC Actions
export const USERS = createRequestTypes('USERS');
export const AUTH_LOGOUT = createRequestTypes('AUTH_LOGOUT');
export const AUTHENTICATE = createRequestTypes('AUTHENTICATE');
export const CREATE_USER = createRequestTypes('CREATE_USER');
export const SET_PASSWORD = createRequestTypes('SET_PASSWORD');

// Other Actions
export const LOGOUT = 'LOGOUT'; // When someone clicks the logout button
export const LOGIN = 'LOGIN'; // When someone clicks the loging button
export const INITIATE_CREATE_USER = 'INITIATE_CREATE_USER';
export const LOAD_USERS_PAGE = 'LOAD_USERS_PAGE';

// Commands
export function logoutUser() {
  // Intiate logout flow
  return action(LOGOUT, {});
}

export function loginUser(creds) {
  // Initiate login flow
  return action(LOGIN, creds);
}