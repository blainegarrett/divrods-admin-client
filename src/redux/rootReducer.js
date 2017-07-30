import * as ActionTypes from './actions';
import paginate from './reducers/paginate';
import { combineReducers } from 'redux';
import layoutReducers from './layout/reducers';
import { authStateReducer } from '../xauth/reducers';
import { routerReducer } from 'react-router-redux';


// This is a simple entty cache that supports data like {resource_id: guid, ...}
// Currently, don't check it, but this should be the source of "truth" for an entity
// Note: This only works with

function entities(state = {}, action) {
  // TODO: This only works for our style of api...

  if (action.type && action.type.indexOf('SUCCESS') !== -1) { // is a list
    var resources = action.response.results;
    if(!Array.isArray(resources)){
      resources = [resources];
    }

    let new_resources = {};
    resources.forEach(function (resource) {
      if (false && resource.resource_id) {
        new_resources[resource.resource_id] = resource;
        return;
      }

      console.debug('Resource did not have resource_id property. Is verbose=true?');
    });

    return Object.assign({}, state, new_resources);
  }

  return state
}

// Updates error message to notify about the failed fetches.
// This might not currently be in use...
function globalErrorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_GLOBAL_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}


// Updates the pagination data for different actions.
const pagination = combineReducers({
  prefs: paginate({
    mapActionToKey: action => 'all',
    types: [
      ActionTypes.PREFS.REQUEST,
      ActionTypes.PREFS.SUCCESS,
      ActionTypes.PREFS.FAILURE
    ]
  }),
  rulesets: paginate({
    mapActionToKey: action => 'all',
    types: [
      ActionTypes.RULESETS.REQUEST,
      ActionTypes.RULESETS.SUCCESS,
      ActionTypes.RULESETS.FAILURE
    ]
  }),
  ruleset_rules: paginate({
    mapActionToKey: action => action.ruleset_id,
    types: [
      ActionTypes.RULES.REQUEST,
      ActionTypes.RULES.SUCCESS,
      ActionTypes.RULES.FAILURE
    ]
  }),
  auth_users: paginate({
    mapActionToKey: action => 'all',
    types: [
      ActionTypes.USERS.REQUEST,
      ActionTypes.USERS.SUCCESS,
      ActionTypes.USERS.FAILURE
    ]
  })
})

export default combineReducers({
  entities,
  pagination,
  globalErrorMessage,
  router: routerReducer,
  layout: layoutReducers,
  auth: authStateReducer
});


/*
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)
*/