import * as ActionTypes from './actions'
import merge from 'lodash'
import paginate from './reducers/paginate'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import layoutReducers from './layout/reducers';
import { authStateReducer } from '../xauth/reducers';


function router(state = { pathname: '/' }, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ROUTER_STATE:
      return action.state
    default:
      return state
  }
}

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, repos: {} }, action) {
  console.log(action);
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
    }

  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED.REQUEST,
      ActionTypes.STARRED.SUCCESS,
      ActionTypes.STARRED.FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS.REQUEST,
      ActionTypes.STARGAZERS.SUCCESS,
      ActionTypes.STARGAZERS.FAILURE
    ]
  })
})

export default combineReducers({
  entities,
  pagination,
  router,
  layout: layoutReducers,
  auth: authStateReducer
});