import * as ActionTypes from '../actions';
import layout from './layout';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import advertStore from '../modules/adverts/reducer';
import authStateStore from '../auth/reducers/auth_state';
import authInviteAcceptStore from '../auth/reducers/invite';
import { venueReducer } from '../modules/venues/redux/reducers';
import { resourceStore2 } from '../modules/venues/redux/reducers';
import { xAuthReducer } from '../xauth/reducers';

import paginate from './paginate';
import { PreferencesManager } from '../modules/preferences/redux/managers';
import { RulesetsManager,  RulesManager} from '../modules/rulesets/redux/managers';

// TODO: These category resources are hardcoded to save REST calls until we really need them. Cloned into store
const temp_category_resources = {
        'QmxvZ0NhdGVnb3J5Hh81NjU4MDkxNjY4MzczNTA0' : {'title': 'MPLSART',
                                                      'slug': 'mplsart',
                                                      'resource_type': 'BlogCategory',
                                                      'resource_id': 'QmxvZ0NhdGVnb3J5Hh81NjU4MDkxNjY4MzczNTA0'
                                                     },
      'QmxvZ0NhdGVnb3J5Hh81NjczMzA5NTQyODA5NjAw': {'title': 'Art On The Wall',
                                                   'slug': 'art-on-the-wall',
                                                   'resource_type': 'BlogCategory',
                                                   'resource_id': 'QmxvZ0NhdGVnb3J5Hh81NjczMzA5NTQyODA5NjAw'
                                                  },
      'QmxvZ0NhdGVnb3J5Hh81NzI4MTE2Mjc4Mjk2NTc2': {'title': 'Reviews',
                                                   'slug': 'exhibition-reviews',
                                                   'resource_type': 'BlogCategory',
                                                   'resource_id': 'QmxvZ0NhdGVnb3J5Hh81NzI4MTE2Mjc4Mjk2NTc2'
                                                  },
      'QmxvZ0NhdGVnb3J5Hh81NzYxNjczOTMxNTIyMDQ4': {'title': 'Blog',
                                                   'slug': 'blog',
                                                   'resource_type': 'BlogCategory',
                                                   'resource_id': 'QmxvZ0NhdGVnb3J5Hh81NzYxNjczOTMxNTIyMDQ4'
                                                  },
      'QmxvZ0NhdGVnb3J5Hh81NzYzMjYzNjA2MjkyNDgw': {'title': 'The Scene',
                                                   'slug': 'scene',
                                                   'resource_type': 'BlogCategory',
                                                   'resource_id': 'QmxvZ0NhdGVnb3J5Hh81NzYzMjYzNjA2MjkyNDgw'
                                                  }
};


export function featuredResourceIndex(state={resource_ids: []}, action) {
    // TODO: Also consider REST Query parameters...?
    switch(action.type) {
        case ActionTypes.FEATURED_HOMEPAGE_SUCCESS: {
            const resource_ids = [];
            const results = action.result.results; // 'raw' results from REST

            // TODO: This will overwrite the index on each pageload...
            for (let i in results) {
                resource_ids.push(results[i].resource_id);
            }
            return Object.assign({}, state, {resource_ids: resource_ids});
        }
        default: {
            return state;
        }
    }
}

export function eventUpcomingIndex(state={resource_ids: []}, action) {
    /* Reducer function that keeps track of latest articles.
        This only keeps track of the resource ids of what should be loaded.
    */

    // TODO: Also consider REST Query parameters...?
    switch(action.type) {
        case ActionTypes.CALENDAR_EVENTS_SUCCESS: {
            const resource_ids = [];
            const results = action.result.results; // 'raw' results from REST

            // TODO: This will overwrite the index on each pageload...
            for (let i in results) {
                resource_ids.push(results[i].resource_id);
            }
            return Object.assign({}, state, {resource_ids: resource_ids});
        }
        default: {
            return state;
        }
    }
}

export function eventNowShowingIndex(state={resource_ids: []}, action) {
    /* Reducer function that keeps track of latest articles.
    This only keeps track of the resource ids of what should be loaded.
    */

    // TODO: Also consider REST Query parameters...?
    switch(action.type) {
        case ActionTypes.CALENDAR_NOWSHOWING_EVENTS_SUCCESS: {
            const resource_ids = [];
            const results = action.result.results; // 'raw' results from REST

            // TODO: This will overwrite the index on each pageload...
            for (let i in results) {
                resource_ids.push(results[i].resource_id);
            }
            return Object.assign({}, state, {resource_ids: resource_ids});
        }
        default: {
            return state;
        }
    }
}


export function articleLatestIndex(state={resources: []}, action) {
    /* Reducer function that keeps track of latest articles.
        This only keeps track of the resource ids of what should be loaded.
    */

    // TODO: Also consider REST Query parameters...?
    switch(action.type) {
        case ActionTypes.WRITTEN_ARTICLES_SUCCESS: {
            const resources = [];
            const results = action.result.results; // 'raw' results from REST

            // TODO: This will overwrite the index on each pageload...
            for (let i in results) {
                resources.push(results[i]);
            }
            return Object.assign({}, state, {resources: resources});
        }
        default: {
            return state;
        }
    }
}

export function resourceStore(state = {resources: {}}, action) {
    /* Reducer function for articles
        The goal of this reducer is to simply maintain a clientside version of artcles we've 'seen'

        store is in the form of
          {
            posts: {
              <resource_id>: <resource>,
              <resource_id>: <resource>,
              ...
            }
          }
      */

    switch(action.type) {
        case ActionTypes.WRITTEN_AUTHORS_SUCCESS:
        case ActionTypes.WRITTEN_ARTICLE_SUCCESS:
        case ActionTypes.WRITTEN_ARTICLES_SUCCESS:
        case ActionTypes.WRITTEN_CATEGORY_ARTICLES_SUCCESS:
        case ActionTypes.WRITTEN_AUTHOR_ARTICLES_SUCCESS:
        case ActionTypes.CALENDAR_EVENTS_SUCCESS:
        case ActionTypes.CALENDAR_NOWSHOWING_EVENTS_SUCCESS:
        case ActionTypes.FEATURED_HOMEPAGE_SUCCESS:
        case ActionTypes.CALENDAR_EVENT_SUCCESS: {
            // New article(s) loaded

            let new_resources = {};
            let results = action.result.results; // 'raw' results from REST

            if (action.type == ActionTypes.WRITTEN_ARTICLE_SUCCESS || action.type == ActionTypes.CALENDAR_EVENT_SUCCESS) {
                // Case: Resource endpoint yeilds a single post, TODO: case off ActionType
                results = [results];
            }

            for (let i in results) {
                new_resources[results[i].resource_id] = results[i]
            }

            let updated_resources = Object.assign({}, state.resources, new_resources);
            return Object.assign({}, state, {resources: updated_resources});
        }
        default: {
            return state;
        }
    }
}

export function articlesByCategorySlugIndex(state={resources: []}, action) {
    /* Reducer function that keeps track of latest articles.
        This only keeps track of the resource ids of what should be loaded.
    */

    // TODO: Also consider REST Query parameters...?
    switch(action.type) {
        case ActionTypes.WRITTEN_CATEGORY_ARTICLES_SUCCESS: {
            const resources = [];
            const results = action.result.results; // 'raw' results from REST

            // TODO: This will overwrite the index on each pageload...
            for (let i in results) {
                resources.push(results[i]);
            }
            return Object.assign({}, state, {resources: resources});
        }
        default: {
            return state;
        }
    }
}

export function articlesByAuthorResourceIndex(state={}, action) {
    /* Reducer function that keeps track of latest articles.
        This only keeps track of the resource ids of what should be loaded.
    */

    // TODO: Also consider REST Query parameters...?
    switch(action.type) {
        case ActionTypes.WRITTEN_AUTHOR_ARTICLES_SUCCESS: {
            const resource_ids = [];
            const results = action.result.results; // 'raw' results from REST

            // TODO: This will overwrite the index on each pageload...
            for (let i in results) {
                resource_ids.push(results[i].resource_id);
            }

            let updated_slug_index = {};
            updated_slug_index[action.author_resource_id] = {resource_ids: resource_ids};
            return Object.assign({}, state, updated_slug_index);
        }
        default: {
            return state;
        }
    }
}

export function authorResourceIndex(state={}, action) {
  /* Index of authors by resource id - TODO: eventually make work for usernames/slugs */

  switch(action.type) {
    case ActionTypes.WRITTEN_AUTHORS_SUCCESS: {

      const resource_ids = [];
      const results = action.result.results;

      for (let i in results) {
        resource_ids.push(results[i].resource_id);
      }
      return Object.assign({}, state, resource_ids);
    }
    default: {
      return state;
    }
  }
}

/*
const defaultState = {posts:[]};
export default function articleReducer(state = defaultState, action) {
  switch(action.type) {
    case ActionTypes.WRITTEN_ARTICLE_SUCCESS: {
      if (typeof(action.result.results) == 'object') {
        let posts = state.posts.concat([action.result.results])
        return Object.assign({}, state, {posts: posts});
      }
      else {
        return Object.assign({}, state, {posts: action.result.results});
      }
    }
    default: {
      return state;
    }
  }
}
*/

// const store = createStore(
  //combineReducers({reduxAsyncConnect}));

/**************/
// Categories
export function articleCategoriesStore(state={}, action){

    switch(action.type) {
        case ActionTypes.WRITTEN_CATEGORY_SUCCESS: {
            let updated_resources = Object.assign({}, state.resources, temp_category_resources);
            return Object.assign({}, state, {resources: updated_resources});
        }
        default: {
            return state
        }
    }
}


export function authStore (state={'is_gae_authenticated': false, 'is_gae_admin': false}, action) {
    switch(action.type) {
        case ActionTypes.AUTH_SUCCESS: {
            return Object.assign({}, state, action.result.results);
        }
        default: {
            return state
        }
    }
}


// TODO: It'd be sweet do do this for a class
const pagination = combineReducers({
  PreferencesManager: paginate({
    mapActionToKey: action => action.urlKey,
    types: PreferencesManager.getActionTypes()
  }),
  RulesManager: paginate({
    mapActionToKey: action => action.urlKey,
    types: RulesManager.getActionTypes()
  }),
  RulesetsManager: paginate({
    mapActionToKey: action => action.urlKey,
    types: RulesetsManager.getActionTypes()
  })
});


const rootReducer = combineReducers({
  authStateStore,
  authInviteAcceptStore,
  xAuthReducer,
  routing,
  authStore,
  layout,
  pagination,
  eventUpcomingIndex,
  eventNowShowingIndex,
  reduxAsyncConnect,
  featuredResourceIndex,
  resourceStore,
  articleLatestIndex,
  articlesByCategorySlugIndex,
  articleCategoriesStore,
  articlesByAuthorResourceIndex,
  authorResourceIndex,
  advertStore,
  venueReducer,
  resourceStore2
})

export default rootReducer
