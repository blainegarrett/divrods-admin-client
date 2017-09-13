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
const PREF_SESSIONS = createRequestTypes('PREF_SESSIONS');

// Normal Action Types
export const LOAD_PREF_SESSIONS_PAGE = 'LOAD_PREF_SESSIONS_PAGE';

/*
Section 2: Redux Reducers
*/
// Note: Only sagas for this are paginated ones and lazily defined in ~/redux/sagas

/*
Section 3: Sagas
*/

// Bind async api fetchers
export const fetchSessions = fetchEntity.bind(null, async_call_mapper(PREF_SESSIONS), pref_service_client.fetchSessions);

// Commands?
function* loadSessions(next_cursor, force_refresh=false) {
  const loaded = yield select(jive, 'sessions', 'all', next_cursor, force_refresh)
  if (!loaded) {
    yield call(fetchSessions, {next_cursor});
  }
}

function* watchLoadSessionsPage() {
  while(true) {
    const {next_cursor} = yield take(LOAD_PREF_SESSIONS_PAGE);
    yield fork(loadSessions, next_cursor);
  }
}

/*
Section 4: Prep exports
*/

// Actions - import { actions } from '../sessions/redux';
const actions = {
  PREF_SESSIONS,
  LOAD_PREF_SESSIONS_PAGE
};

// Store Reducers - import { reducers as miacollectionsReducers } from '../miacollections';
const reducers = combineReducers({});

// Sagas - import { sagas as miacollectionsSagas } from '../miacollections';
const sagas = [
    fork(watchLoadSessionsPage)
];

export { actions, reducers, sagas }