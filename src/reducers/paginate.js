import union from 'lodash/union'

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, mapActionToKey }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

  const [ requestType, successType, failureType ] = types;

  const updatePagination = (state = {
    isFetching: false,
    nextCursor: undefined,
    pageCount: 0,
    more: undefined,
    ids: []
  }, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        }
      case successType:
        return {
          ...state,
          isFetching: false,
          ids: union(state.ids, action.result.results),
          nextCursor: action.result.cursor, // next url cursor
          pageCount: state.pageCount + 1,
          more:action.result.more
        }
      case failureType:
        return {
          ...state,
          isFetching: false
        }
      default:
        return state
    }
  }

  return (state = {}, action) => {
    // Update pagination by key

    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const endpointKey = mapActionToKey(action) // url + params sans cursor

        if (typeof endpointKey !== 'string') {
          throw new Error('Expected key to be a string.')
        }

        const prevEndpointState = state[endpointKey];
        return {
          ...state,
          [endpointKey]: {
            ...prevEndpointState,
            hasMore() {
              let hasMore = false;
              for (var i in this) { // todo: we may want to move the pages to 'pages' prop
                 hasMore = this[i].more;
              }
              return hasMore;
            },
            getResources() {
                // This will return all the resources in the order they were added to the index
                let resources = [];
                for (var i in this) {
                  for (var j in this[i].ids) {
                    resources.push(this[i].ids[j]);
                  }
                }
                return resources;
            },
            getNextCursor() {
              // Helper to get the next cursor
              let lastCursor = [];
              for (var i in this) { // todo: we may want to move the pages to 'pages' prop
                lastCursor = this[i].nextCursor;
              }
              return lastCursor;
            },

          [action.pageKey] : updatePagination(state[endpointKey], action)}
        }
      default:
        return state
    }
  }
}

export default paginate