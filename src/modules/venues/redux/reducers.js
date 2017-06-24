// Reducers for Venues
import * as Actions from './actions';


// We probably no longer need this...
const defaultState = {};
export function venueReducer(state = defaultState, action) {
  switch(action.type) {
    case Actions.VENUES_QUERY_SUCCESS: {

      //onsole.log("-------------");
      //console.log(action.result.results);

      return Object.assign({}, state, {venue: action.result.results});
    }
    default: {
      return state;
    }
  }
}


export function resourceStore2(state={resources: {}}, action) {
  if (action.type.indexOf('_QUERY_SUCCESS') == -1) {
    return state;
  }

  // Determine if we have one or many results
  let results = action.result.results;

  if (results._meta && results._meta.resource_type) { // one single Resource
    results = [results];
  }

  // Iterate over results and create a id:resource mapping
  let new_resources = {};
  for (let i in results) {
    new_resources[results[i].resource_id] = results[i];
  }

  // Merge existing index map with new index map
  let updated_resources = Object.assign({}, state.resources, new_resources);

  //console.log(updated_resources);
  return Object.assign({}, state, {resources: updated_resources});
}