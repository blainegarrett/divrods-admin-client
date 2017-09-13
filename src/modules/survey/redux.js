import { combineReducers } from 'redux';
import { take, put, fork, select } from 'redux-saga/effects';
import { actions as utilityActions } from '../utility';
import { action as actionCreator } from '../../redux/actions'; // TODO: No * Import
import { INITIATE_PUT_PREFERENCE } from '../../redux/actions'; // TODO: No * Import
import { commands as itemCommands } from '../items/redux';
import { actions as itemActions } from '../items/redux';
import { actions as miacollectionActions} from '../miacollections';

const MAX_PREFS_PER_SESSION = 5
/*
Section 1: Redux Actions
*/
// Async Action Types

// Normal Action Types
const INIT_SURVEY_PAGE = 'INIT_SURVEY_PAGE';
const SURVEY_INITIALIZED = 'SURVEY_INITIALIZED';
const INIT_NEW_SESSION = 'INIT_NEW_SESSION';
const RECORD_SURVEY_PREF = 'RECORD_SURVEY_PREF';
const RECORD_SURVEY_PREF_UPDATE_SESSION = 'RECORD_SURVEY_PREF_UPDATE_SESSION';
const PROMPT_NEW_ART = 'PROMPT_NEW_ART';
const INIT_PROMPT_FOR_ART = 'INIT_PROMPT_FOR_ART';
/*
Section 2: Redux Reducers
*/
function surveyItemReducer(state={index:[]}, action) {
    if (action.type === SURVEY_INITIALIZED) {
        return {index:action.items};
    }
    return state;
}

function surveyItemPromptReducer(state={'item_id': null}, action) {
    if (action.type === PROMPT_NEW_ART) {
        return {'item_id': action.item_id};
    }
    return state;
}

function surveySession(state={user_id: 0, preferenced_items: []}, action) {
    if (action.type === INIT_NEW_SESSION) {
        return {user_id: action.user_id, preferenced_items: []}
    }
    if (action.type === RECORD_SURVEY_PREF_UPDATE_SESSION) {
        let new_item = {item_id: action.item_id, pref:action.pref }
        let preferenced_items = state.preferenced_items.concat([new_item])
        return Object.assign({}, state, {preferenced_items: preferenced_items})
    }
    return state;
}


/*
Section 3: Sagas
*/

// Bind async api fetchers

function* watchPromptArtAction() {
    /* Prompt the user to pref some art
        - Determines next artwork to prompt for
        - Sets the target artwork
        - Displays artwork in side panel
    */

    while(true) {
        // Determine new Item Prompt
        yield take(INIT_PROMPT_FOR_ART);
        let next_artwork_id = yield select(getNextArtworkToPrompt, null);

        yield put(actionCreator(PROMPT_NEW_ART, {item_id: next_artwork_id}));

        yield put(actionCreator(miacollectionActions.INIT_SHOW_ARTWORK, {artwork_id: next_artwork_id}));
    }
}

function* watchRecordSurveyPrefAction() {
    /* Handles the user preferencing artwork
        - stores the artwork in the "session"
        - persists the preference in the api
        - triggers prompting the next artwork
    */
  while(true) {
    // Form params..
    let {item_id, pref} = yield take(RECORD_SURVEY_PREF);

    // Extract the user id from the session
    const user_id = yield select(getUserIdFromSession)

    //Store the artwork in the "session" preferences
    yield put(actionCreator(RECORD_SURVEY_PREF_UPDATE_SESSION, {item_id, pref}));

    // Trigger async to persist the preference in the api
    yield put(actionCreator(INITIATE_PUT_PREFERENCE, {item_id, user_id, pref}))

    // Get total # preferenced
    const total_preferences = yield select(getTotalPreferencesForSession);
    if (total_preferences >= MAX_PREFS_PER_SESSION) {
        // Trigger cycling the session
        yield put(actionCreator(INIT_SURVEY_PAGE)); // Sorta like a reload...
    }
    else {
        // Trigger prompting for a new artwork to preference
        yield put(actionCreator(INIT_PROMPT_FOR_ART));
    }
  }
}

function* watchInitSurveyPageAction() {
  while(true) {
    // Watch for Survey Init
    yield take(INIT_SURVEY_PAGE);

    // Update Session Data
    yield put(actionCreator(utilityActions.INIT_LOAD_TAGGED_ART));

  }
}

function* watchLoadTaggedArtworkSuccessAction() {
  while(true) {
    // Form params..
    const { response } = yield take(utilityActions.LOAD_TAGGED_ART.SUCCESS);
    if (response.results) {
        let item_ids = [];
        let i;
        for (i in response.results) {
            item_ids.push(response.results[i].artid);
        }

        // Load the explicit target set of preffed items
        yield fork(itemCommands.loadExplicitItems, item_ids);
    }
    else {
        console.log('Something is wrong with loading the tagged data...');
    }
  }
}

function* watchTaggedExplicitPrefItemsSuccessAction() {
  while(true) {

    // Wait for the Explicit Pref Items async call to succeed
    const { response } = yield take(itemActions.EXPLICIT_PREF_ITEMS.SUCCESS);

    // Merge the data that is in the store
    const mergedData = yield select(mergeTaggedArtAndItemPrefs, response.results)
    yield put(actionCreator(SURVEY_INITIALIZED, {items: mergedData}));

    // TODO: Generate new session id and put action to reset reducer for new session
    let user_id = generateSessionId();
    yield put(actionCreator(INIT_NEW_SESSION, {user_id}))

    yield put(actionCreator(INIT_PROMPT_FOR_ART))
  }
}

// Helpers
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]]=[array[j], array[i]]
    }
    return array;
}

function generateSessionId() {
    let rand1 = Math.random() * 10.0;
    return 'admin_survey_' + rand1.toString();
}

function getUserIdFromSession(state) {
    return state.surveyReducers.surveySession.user_id;
}
function getTotalPreferencesForSession(state) {
    return state.surveyReducers.surveySession.preferenced_items.length;
}

function mergeTaggedArtAndItemPrefs(state, itemResources) {
    let mergedData = {};
    let taggedArt, prefItem;
    let i;

    for (i in state.utilityService.taggedArtwork.index) {
        taggedArt = state.utilityService.taggedArtwork.index[i];
        mergedData[taggedArt.artid] = {item_id: taggedArt.artid, total_preferences: 0, total_dislikes: 0, total_likes: 0}
    }

    // Merge in the pref item data
    for (i in itemResources) {
        prefItem = itemResources[i];
        if (prefItem.item_id) {
            mergedData[prefItem.item_id].total_preferences = prefItem.total_preferences;
            mergedData[prefItem.item_id].total_dislikes = prefItem.total_dislikes;
            mergedData[prefItem.item_id].total_likes = prefItem.total_likes;
        }
    }

    let return_list = [];
    var sort_pairs = Object.keys(mergedData).map(function(key) {
        return [key, mergedData[key].total_preferences];
    });

    // Randomize so that when sorting by total_prefs of the same #, we mix it up a little bit
    sort_pairs = shuffleArray(sort_pairs);

    // Sort the array based on the second element
    sort_pairs.sort(function(first, second) {
        return first[1] - second[1];
    });

    // Iterate over the sorted bits
    for (let x in sort_pairs) {
        return_list.push(mergedData[sort_pairs[x][0]])
    }
    return return_list;
}

function getNextArtworkToPrompt(state, last_item_id) {
    let sessionItems = state.surveyReducers.surveySession.preferenced_items.concat([{'item_id': last_item_id}])
    for (let i in state.surveyReducers.surveyItemReducer.index) {
        let taggedArt = state.surveyReducers.surveyItemReducer.index[i];
        //let not_found = true;

        let found = false;
        for (let k in sessionItems) {
            let sessionPref = sessionItems[k];
            if (sessionPref.item_id === taggedArt.item_id) {
                found = true;
                break;
            }
        }
        if (!found) {
            return taggedArt.item_id
        }
    }

    // TODO: Error..?? THEY PREFFED EVERYTHING
    return 0
}

/*
Section 4: Prep exports
*/

// Actions - import { actions } from '../sessions/redux';
const actions = {
  INIT_PROMPT_FOR_ART,
  PROMPT_NEW_ART,
  INIT_SURVEY_PAGE,
  SURVEY_INITIALIZED,
  INIT_NEW_SESSION,
  RECORD_SURVEY_PREF
};

// Store Reducers - import { reducers as miacollectionsReducers } from '../miacollections';
const reducers = combineReducers({
    surveyItemReducer,
    surveyItemPromptReducer,
    surveySession
});

// Sagas - import { sagas as miacollectionsSagas } from '../miacollections';
const sagas = [
    fork(watchPromptArtAction),
    fork(watchInitSurveyPageAction),
    fork(watchLoadTaggedArtworkSuccessAction),
    fork(watchTaggedExplicitPrefItemsSuccessAction),
    fork(watchRecordSurveyPrefAction)
];

export { actions, reducers, sagas }