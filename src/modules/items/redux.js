import { combineReducers } from 'redux';
import { take, fork, select } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { jive } from '../../redux/sagas';

import { pref_service_client } from '../../services';
import { createRequestTypes } from '../../redux/actions';
import { fetchEntity } from '../../redux/sagas';

import { async_call_mapper } from '../../redux/actions';

/*
Section 1: Redux Actions
*/
// Async Action Types
const PREF_ITEMS = createRequestTypes('LOAD_ITEMS');
const EXPLICIT_PREF_ITEMS = createRequestTypes('EXPLICIT_PREF_ITEMS');

// Normal Action Types
export const LOAD_PREF_ITEMS_PAGE = 'LOAD_ITEMS_PAGE';

/*
Section 2: Redux Reducers
*/

/*
Section 3: Sagas
*/

// Bind async api fetchers
export const fetchItems = fetchEntity.bind(null, async_call_mapper(PREF_ITEMS), pref_service_client.fetchItems);
export const fetchExplicitItems = fetchEntity.bind(null, async_call_mapper(EXPLICIT_PREF_ITEMS), pref_service_client.fetchItemsByIdList);
// Commands?
function* loadItems(next_cursor, force_refresh=false) {
  const loaded = yield select(jive, 'items', 'all', next_cursor, force_refresh)
  if (!loaded) {
    yield call(fetchItems, {next_cursor});
  }
}

function* loadExplicitItems(item_ids) {
    yield call(fetchExplicitItems, {item_ids});
}


function* watchLoadItemsPage() {
  while(true) {
    const {next_cursor} = yield take(LOAD_PREF_ITEMS_PAGE);
    yield fork(loadItems, next_cursor);
  }
}

/*
Section 4: Prep exports
*/

// Actions - import { actions } from '../items/redux';
const actions = {
  PREF_ITEMS,
  LOAD_PREF_ITEMS_PAGE,
  EXPLICIT_PREF_ITEMS
};

// Store Reducers - import { reducers as itemReducers } from '../items';
const reducers = combineReducers({});

// Sagas - import { sagas as itemSagas } from '../items';
const sagas = [
  fork(watchLoadItemsPage),
];

const commands = {
  loadExplicitItems
}
export { actions, reducers, sagas, commands}