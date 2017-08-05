// Utility API module
import { combineReducers } from 'redux';
import { take, put, fork } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';

import { loadTaggedArtwork } from './api';
import { createRequestTypes } from '../../redux/actions';
import { fetchEntity } from '../../redux/sagas';
import { action as actionCreator } from '../../redux/actions'; // TODO: No * Import
import { async_call_mapper } from '../../redux/actions';


/*
Section 1: Redux Actions
*/
// Async Action Types
const LOAD_TAGGED_ART = createRequestTypes('LOAD_TAGGED_ART');

// Normal Action Types
const INIT_LOAD_TAGGED_ART = 'INIT_LOAD_TAGGED_ART';

/*
Section 2: Redux Reducers
*/
function taggedArtworkReducer(state = {}, action) {
  console.log(action);

  // Note: elastic search doesn't return a fail state if the id does not exist
  switch(action.type) {
    case LOAD_TAGGED_ART.SUCCESS: {
        console.log('!?!?!??!?!?!');
        console.log(action);
      return Object.assign({}, action.response.results, {});
    }
    default:
      return state;
  }
}

/*
Section 3: Sagas
*/

// Bind async api fetchers
export const fetchArtworkItem    = fetchEntity.bind(null, async_call_mapper(LOAD_TAGGED_ART), loadTaggedArtwork)

// Load Load a page of users - note: page size is staticly defined in pref_service_client
function* loadArtworkItem(artwork_id) {
  //const loaded = yield select(jive, 'auth_users', 'all', next_cursor, force_refresh)
  //if (!loaded) {
    yield call(fetchArtworkItem, {artwork_id});
  //}
}


function* watchInitLoadTaggedArtwork() {
  while(true) {
    // Once succes response, wait 1 second, reload the data, and close the form
    const { artwork_id } = yield take(INIT_LOAD_TAGGED_ART);
    yield fork(loadArtworkItem, artwork_id);
  }
}

function* watchLoadTaggedArtworkSuccess() {
  // We may not need this...
  while(true) {
    const stuff = yield take(LOAD_TAGGED_ART.SUCCESS);
    console.log(stuff);
  }
}



/*
Section 4: Prep exports
*/

// Actions - import { actions } from '../miacollections';
const actions = {
  INIT_LOAD_TAGGED_ART,
  LOAD_TAGGED_ART
};

// Store Reducers - import { reducers as miacollectionsReducers } from '../miacollections';
const reducers = combineReducers({
  taggedArtwork: taggedArtworkReducer,
});

// Sagas - import { sagas as miacollectionsSagas } from '../miacollections';
const sagas = [
  fork(watchInitLoadTaggedArtwork),
  fork(watchLoadTaggedArtworkSuccess),
];

export { actions, reducers, sagas }