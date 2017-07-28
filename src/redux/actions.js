
// Leftover Demo Stuff... Please Delete
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


// DELETE all of the below... it is leftover from the saga demo
export const USER = createRequestTypes('USER')
export const REPO = createRequestTypes('REPO')
export const STARRED = createRequestTypes('STARRED')
export const STARGAZERS = createRequestTypes('STARGAZERS')

export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE'
export const NAVIGATE =  'NAVIGATE'
export const LOAD_USER_PAGE = 'LOAD_USER_PAGE'
export const LOAD_REPO_PAGE = 'LOAD_REPO_PAGE'
export const LOAD_MORE_STARRED = 'LOAD_MORE_STARRED'
export const LOAD_MORE_STARGAZERS = 'LOAD_MORE_STARGAZERS'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'


export const user = {
  request: login => action(USER[REQUEST], {login}),
  success: (response, login) => action(USER[SUCCESS], {login, response}),
  failure: (error, login) => action(USER[FAILURE], {login, error}),
}

export const repo = {
  request: fullName => action(REPO[REQUEST], {fullName}),
  success: (fullName, response) => action(REPO[SUCCESS], {fullName, response}),
  failure: (fullName, error) => action(REPO[FAILURE], {fullName, error}),
}

export const starred = {
  request: login => action(STARRED[REQUEST], {login}),
  success: (login, response) => action(STARRED[SUCCESS], {login, response}),
  failure: (login, error) => action(STARRED[FAILURE], {login, error}),
}

export const stargazers = {
  request: fullName => action(STARGAZERS[REQUEST], {fullName}),
  success: (fullName, response) => action(STARGAZERS[SUCCESS], {fullName, response}),
  failure: (fullName, error) => action(STARGAZERS[FAILURE], {fullName, error}),
}

export const updateRouterState = state => action(UPDATE_ROUTER_STATE, {state})
export const navigate = pathname => action(NAVIGATE, {pathname})
export const loadUserPage = function(login, requiredFields = []) {
  console.log('loadUserPage');
  let a = action(LOAD_USER_PAGE, {login, requiredFields});
  console.log(a);
  return a
}

export const loadRepoPage = (fullName, requiredFields = []) => action(LOAD_REPO_PAGE, {fullName, requiredFields})
export const loadMoreStarred = login => action(LOAD_MORE_STARRED, {login})
export const loadMoreStargazers = fullName => action(LOAD_MORE_STARGAZERS, {fullName})

export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE)
