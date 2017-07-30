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

    switch (action.type) {
      case requestType:
        return Object.assign({}, state, {
          isFetching: true
        })
      case successType:
        let new_cursor_map = {};
        let resources = {};
        let start_cursor = action.next_cursor; // could be undefined for initial page

        new_cursor_map[action.next_cursor || 'start'] = Date.now();

        if (!start_cursor) {
          start_cursor = 'start';
          resources = action.response.results;
          new_cursor_map = {[action.next_cursor] : Date.now()}
          new_cursor_map = Object.assign({}, new_cursor_map, {});
        }
        else  {
          new_cursor_map = {[action.next_cursor]: Date.now()};
          resources = state.ids.concat(action.response.results);
          new_cursor_map = Object.assign({}, new_cursor_map, state.cursors);
        }

        // action.next_cursor is the cursor used for the request (i.e. start cursor)
        // action.response.cursor is for the "next" request of data (if any)
        const new_state = Object.assign({}, state, {
          isFetching: false,
          ids: resources,
          cursor: action.response.cursor,
          more: action.response.more,
          cursors: Object.assign({}, new_cursor_map, state.cursors)
        })
        return new_state;
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
