// Main module for interactions with mia elastic search
import React from 'react';
import { combineReducers } from 'redux';
import { take, put, fork } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';

import { loadArtwork } from './api';
import ArtworkItemSidebarComponent from './ArtworkItemSidebarComponent'
import { createRequestTypes } from '../../redux/actions';
import { fetchEntity } from '../../redux/sagas';
import { action as actionCreator } from '../../redux/actions'; // TODO: No * Import
import { async_call_mapper } from '../../redux/actions';
import * as layoutActions from '../../redux/layout/actions';
/*
Section 1: Redux Actions
*/
// Async Action Types
const LOAD_ARTWORK = createRequestTypes('LOAD_ARTWORK');

// Normal Action Types
const INIT_SHOW_ARTWORK = 'INIT_SHOW_ARTWORK';

/*
Section 2: Redux Reducers
*/
function miaArtworkItemReducer(state = {}, action) {
  // Note: elastic search doesn't return a fail state if the id does not exist
  switch(action.type) {
    case LOAD_ARTWORK.SUCCESS: {
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
export const fetchArtworkItem    = fetchEntity.bind(null, async_call_mapper(LOAD_ARTWORK), loadArtwork)

// Load Load a page of users - note: page size is staticly defined in pref_service_client
function* loadArtworkItem(artwork_id) {
  //const loaded = yield select(jive, 'auth_users', 'all', next_cursor, force_refresh)
  //if (!loaded) {
    yield call(fetchArtworkItem, {artwork_id});
  //}
}


function* watchInitShowArtwork() {
  while(true) {
    // Once succes response, wait 1 second, reload the data, and close the form
    const { artwork_id } = yield take(INIT_SHOW_ARTWORK);
    yield put(actionCreator(layoutActions.LAYOUT_OPEN_SIDE));
    yield put(actionCreator(layoutActions.LAYOUT_SET_CONTENT, {content: (<b>loading...</b>)}), );
    yield fork(loadArtworkItem, artwork_id);
  }
}

function* watchLoadArtworkItemSuccess() {
  while(true) {
    const { artwork_id } = yield take(LOAD_ARTWORK.SUCCESS);
    yield put(actionCreator('LAYOUT_SET_CONTENT', {content: (<ArtworkItemSidebarComponent artwork_id={artwork_id} />)}), );
  }
}

/*
Section 4: Prep exports
*/

// Actions - import { actions } from '../miacollections';
const actions = {
  LOAD_ARTWORK,
  INIT_SHOW_ARTWORK
};

// Store Reducers - import { reducers as miacollectionsReducers } from '../miacollections';
const reducers = combineReducers({
  miaArtworkItem: miaArtworkItemReducer,
});

// Sagas - import { sagas as miacollectionsSagas } from '../miacollections';
const sagas = [
  fork(watchInitShowArtwork),
  fork(watchLoadArtworkItemSuccess),
];

export { actions, reducers, sagas }