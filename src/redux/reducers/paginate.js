import _ from 'lodash'
//import merge from 'lodash'
//import union from 'lodash'

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginate({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

  const [ requestType, successType, failureType ] = types

  function updatePagination(state = {
    isFetching: false,
    ids: [],
    more: false,
    cursors: []
  }, action) {

    console.log(action);
    switch (action.type) {
      case requestType:
        return Object.assign({}, state, {
          isFetching: true
        })
      case successType:

        const new_cursor_map = {};

        console.log('!!!');
        console.log(action.start_cursor);

        new_cursor_map[action.start_cursor || 'start'] = Date.now();
        const jive = Object.assign({}, state, {
          isFetching: false,
          ids: state.ids.concat(action.response.results),
          cursor: action.response.cursor,
          more: action.response.more,
          cursors: Object.assign({}, new_cursor_map, state.cursors)
        })
        return jive;
      case failureType:
        return Object.assign({}, state, {
          isFetching: false
        })
      default:
        return state
    }
  }

  return function updatePaginationByKey(state = {}, action) {

    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action)
        console.log(key)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return Object.assign({}, state, {
          [key]: updatePagination(state[key], action)
        })
      default:
        return state
    }
  }
}
