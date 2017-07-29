const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export function createRequestTypes(base) {
  // Helper to create Actions for async operations for easy access
  // returns an object with props like {REQUEST: 'REQUEST', SUCCESS: 'SUCCESS', FAILURE: 'FAILURE'}
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export function action(type, payload = {}) {
  // Helper to construct a redux action
  return {type, ...payload}
}


// ASYNC Actions
export const PREFS = createRequestTypes('PREFS');
export const RULESETS = createRequestTypes('RULESETS');
export const RULES = createRequestTypes('RULES');
export const USERS = createRequestTypes('USERS');

// These are poorly named, but not sure what else to call them...
export function async_call_mapper(actionGroup) {
  // Helper to map return arguments from async calls to hydrated actions to be handled by pagination, etc
  // actionGroup is a object created by createRequestTypes
  return {
    request: (async_args) => action(actionGroup[REQUEST], {...async_args}),
    success: (response, async_args) => action(actionGroup[SUCCESS], {response, ...async_args}),
    failure: (error, async_args) => action(actionGroup[FAILURE], {error, ...async_args}),
  }
}

// Regular Actions
export const LOAD_PREFS_PAGE = 'LOAD_PREFS_PAGE';
export const LOAD_RULESETS_PAGE = 'LOAD_RULESETS_PAGE';
export const LOAD_RULES_PAGE = 'LOAD_RULES_PAGE';
export const LOAD_USERS_PAGE = 'LOAD_USERS_PAGE';


// Move to XAUTH
export const USER = createRequestTypes('USER')
export const user = {
  request: login => action(USER[REQUEST], {login}),
  success: (response, login) => action(USER[SUCCESS], {login, response}),
  failure: (error, login) => action(USER[FAILURE], {login, error}),
}