import {get_runtime_constants, API_DOMAIN, PREF_SERVICE_DOMAIN } from '../constants';

/* Written Articles Constants */
export const WRITTEN_ARTICLE_REQUEST = 'WRITTEN:ARTICLE_REQUEST';
export const WRITTEN_ARTICLE_SUCCESS = 'WRITTEN:ARTICLE_SUCCESS';
export const WRITTEN_ARTICLE_FAILURE = 'WRITTEN:ARTICLE_FAILURE';

export const WRITTEN_ARTICLES_REQUEST = 'WRITTEN:ARTICLES_REQUEST';
export const WRITTEN_ARTICLES_SUCCESS = 'WRITTEN:ARTICLES_SUCCESS';
export const WRITTEN_ARTICLES_FAILURE = 'WRITTEN:ARTICLES_FAILURE';

export const WRITTEN_AUTHOR_ARTICLES_REQUEST = 'WRITTEN:AUTHOR_ARTICLES_REQUEST';
export const WRITTEN_AUTHOR_ARTICLES_SUCCESS = 'WRITTEN:AUTHOR_ARTICLES_SUCCESS';
export const WRITTEN_AUTHOR_ARTICLES_FAILURE = 'WRITTEN:AUTHOR_ARTICLES_FAILURE';

export const WRITTEN_CATEGORY_ARTICLES_REQUEST = 'WRITTEN:CATEGORY_ARTICLES_REQUEST';
export const WRITTEN_CATEGORY_ARTICLES_SUCCESS = 'WRITTEN:CATEGORY_ARTICLES_SUCCESS';
export const WRITTEN_CATEGORY_ARTICLES_FAILURE = 'WRITTEN:CATEGORY_ARTICLES_FAILURE';

export const WRITTEN_AUTHORS_REQUEST = 'WRITTEN:AUTHORS_REQUEST';
export const WRITTEN_AUTHORS_SUCCESS = 'WRITTEN:AUTHORS_SUCCESS';
export const WRITTEN_AUTHORS_FAILURE ='WRITTEN:AUTHORS_FAILURE';

/* Written Category Constants */
export const WRITTEN_CATEGORY_REQUEST = 'WRITTEN:CATEGORY_REQUEST';
export const WRITTEN_CATEGORY_SUCCESS = 'WRITTEN:CATEGORY_SUCCESS';
export const WRITTEN_CATEGORY_FAILURE = 'WRITTEN:CATEGORY_FAILURE';

export const CALENDAR_EVENTS_REQUEST = 'CALENDAR:EVENTS_REQUEST';
export const CALENDAR_EVENTS_SUCCESS = 'CALENDAR:EVENTS_SUCCESS';
export const CALENDAR_EVENTS_FAILURE = 'CALENDAR:EVENTS_FAILURE';

export const CALENDAR_NOWSHOWING_EVENTS_REQUEST = 'CALENDAR:NOWSHOWING_EVENTS_REQUEST';
export const CALENDAR_NOWSHOWING_EVENTS_SUCCESS = 'CALENDAR:NOWSHOWING_EVENTS_SUCCESS';
export const CALENDAR_NOWSHOWING_EVENTS_FAILURE = 'CALENDAR:NOWSHOWING_EVENTS_FAILURE';

export const FEATURED_HOMEPAGE_REQUEST = 'FEATURED:HOMEPAGE_REQUEST';
export const FEATURED_HOMEPAGE_SUCCESS = 'FEATURED:HOMEPAGE_SUCCESS';
export const FEATURED_HOMEPAGE_FAILURE = 'FEATURED:HOMEPAGE_FAILURE';


export const CALENDAR_EVENT_REQUEST = 'CALENDAR:EVENT_REQUEST';
export const CALENDAR_EVENT_SUCCESS = 'CALENDAR:EVENT_SUCCESS';
export const CALENDAR_EVENT_FAILURE = 'CALENDAR:EVENT_FAILURE';


export const AUTH_REQUEST = 'AUTH:REQUEST';
export const AUTH_SUCCESS = 'AUTH:SUCCESS';
export const AUTH_FAILURE = 'AUTH:FAILURE';

export function getAuth(state) {
    return state.authStore
}
export function fetchAuth(state) {
  return {
      types: [ AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE ],
      promise: (client) => {
        return client.get(PREF_SERVICE_DOMAIN + '/api/auth');
      }
  }
}


export function fetchEventBySlug(state, slug) {

  // Step 1: Check to see if it is already loaded
  //let p = getEventBySlug(state, slug)
  //let not_loaded = !(p)
  //if (!not_loaded) { return; }

  // Otherwise, setup promise for client to fetch the article
  return {
      types: [ CALENDAR_EVENT_REQUEST, CALENDAR_EVENT_SUCCESS, CALENDAR_EVENT_FAILURE ],
      promise: (client) => {
        return client.get(API_DOMAIN + '/api/events?get_by_slug=' + slug);
      }
  }
}
export function getEventBySlug(state, slug) {
  // Retrieve an article by slug from the pool

    let resource;
    for (let resource_id in state.resourceStore.resources) {
      resource = state.resourceStore.resources[resource_id];
      if (resource.slug == slug) {
        return resource
      }

    }
    return false;
}

export function fetchFeaturedResources(state) {

    if (state.featuredResourceIndex.resource_ids.length > 0) {
        return;
    }

    return {
        types: [ FEATURED_HOMEPAGE_REQUEST, FEATURED_HOMEPAGE_SUCCESS, FEATURED_HOMEPAGE_FAILURE ],
        promise: (client) => {
            return client.get(API_DOMAIN + '/api/featured');
        }
    }
}

export function getFeaturedResources(state) {
    // Retreive a set of events from the index
    let resources = [];

    // Iterate over index of expected items
    for (let resource_id of state.featuredResourceIndex.resource_ids) {
      resources.push(state.resourceStore.resources[resource_id]);
    }
    return resources;
}


/***********************************************************/
export function fetchNowShowingEvents(state) {

    // TODO: Cache if already exist
    if (state.eventNowShowingIndex.resource_ids.length > 0) {
        return;
    }

    let today_start_date_utc = get_runtime_constants().today_start_date_utc;
    const start_stamp = today_start_date_utc.format('YYYY-MM-DD[T]HH:mm:ss[Z]');

    return {
        types: [ CALENDAR_NOWSHOWING_EVENTS_REQUEST,
                 CALENDAR_NOWSHOWING_EVENTS_SUCCESS,
                 CALENDAR_NOWSHOWING_EVENTS_FAILURE ],
        promise: (client) => {
            return client.get(API_DOMAIN + '/api/events/upcoming?sort=end&category=ongoing&end=' + start_stamp + '&start=' + start_stamp);
        }
    }
}

export function fetchUpcomingEvents(state) {

    // TODO: Cache if already exist
    if (state.eventUpcomingIndex.resource_ids.length > 0) {
        return;
    }
    let today_end_date_utc = get_runtime_constants().today_end_date_utc;
    const end_stamp = today_end_date_utc.format('YYYY-MM-DD[T]HH:mm:ss[Z]');

    return {
        types: [ CALENDAR_EVENTS_REQUEST, CALENDAR_EVENTS_SUCCESS, CALENDAR_EVENTS_FAILURE ],
        promise: (client) => {
            return client.get(API_DOMAIN + '/api/events/upcoming?sort=start&category=performance,reception,sale&end=' + end_stamp);
        }
    }
}

export function getNowShowingEvents(state) {

    // Retreive a set of events from the index
    let resources = [];

    // Iterate over index of expected items
    for (let resource_id of state.eventNowShowingIndex.resource_ids) {
      resources.push(state.resourceStore.resources[resource_id]);
    }
    return resources;
}

export function getUpcomingEvents(state) {

    // Retreive a set of events from the index
    let resources = [];

    // Iterate over index of expected items
    for (let resource_id of state.eventUpcomingIndex.resource_ids) {
      resources.push(state.resourceStore.resources[resource_id]);
    }
    return resources;
}


/***********************************************************/
/* Categories */
export function getCatgoryBySlug(state, category_slug) {

    let resource;
    for (let resource_id in state.articleCategoriesStore.resources) {
      resource = state.articleCategoriesStore.resources[resource_id];
      if (resource.slug == category_slug) {
        return resource
      }
    }
    return false;
}

export function fetchCategoryBySlug(state, slug) {
  // For now, we don't actually need call out to the REST resource since we have hardcoded the resources
  return { type: WRITTEN_CATEGORY_SUCCESS }
}


export function fetchArticleBySlug(state, slug) {

  // Step 1: Check to see if it is already loaded
  let doober = new ArticleDoober()
  let p = doober.getArticleBySlug(state, slug)
  let not_loaded = !(p)
  if (!not_loaded) { return; }

  // Otherwise, setup promise for client to fetch the article
  return {
      types: [ WRITTEN_ARTICLE_REQUEST, WRITTEN_ARTICLE_SUCCESS, WRITTEN_ARTICLE_FAILURE ],
      promise: (client) => {
        return client.get(API_DOMAIN + '/api/posts?get_by_slug=' + slug)
      }
  }
}

export function fetchArticles(state) {
  // Hijacked to be preferences
  //if (state.articleLatestIndex.resource_ids.length > 0) {
  //  return;
  //}

  return {
      types: [ WRITTEN_ARTICLES_REQUEST, WRITTEN_ARTICLES_SUCCESS, WRITTEN_ARTICLES_FAILURE ],
      promise: (client) => {
          return client.get(PREF_SERVICE_DOMAIN + '/api/rest/v1.0/preferences');
      }
  }
}

export function fetchArticlesByCategorySlug(state) {
  // Hijacked to be preferences
  //if (state.articlesByCategorySlugIndex.resource_ids.length > 0) {
  //  return;
  //}

  console.log('fetchArticlesByCategorySlug');
  return {
      types: [ WRITTEN_CATEGORY_ARTICLES_REQUEST, WRITTEN_CATEGORY_ARTICLES_SUCCESS, WRITTEN_CATEGORY_ARTICLES_FAILURE ],
      promise: (client) => {
          return client.get(PREF_SERVICE_DOMAIN + '/api/rest/v1.0/rulesets?verbose=true');
      }
  }
}


export function fetchArticlesByAuthorResource(state, author_slug) {
  if (state.articlesByAuthorResourceIndex[author_slug] && state.articlesByAuthorResourceIndex[author_slug].resource_ids.length > 0) {
    return;
  }
  return {
    author_resource_id: author_slug,
    types: [ WRITTEN_AUTHOR_ARTICLES_REQUEST, WRITTEN_AUTHOR_ARTICLES_SUCCESS, WRITTEN_AUTHOR_ARTICLES_FAILURE ],
    promise: (client) => {
      return client.get(PREF_SERVICE_DOMAIN + '/api/rest/v1.0/recommendations?ruleset_id=' + author_slug + '&verbose=true');
    }
  }
}

export function fetchAuthorResource(state, author_resource_id) {
  if (state.resourceStore.resources[author_resource_id]) {
    return;
  }
  // Else attempt to load all authors
  return {
    author_resource_id: author_resource_id,
    types: [ WRITTEN_AUTHORS_REQUEST, WRITTEN_AUTHORS_SUCCESS, WRITTEN_AUTHORS_FAILURE ],
    promise: (client) => {
      return client.get(API_DOMAIN + '/api/users');
    }
  }
}

export function getAuthorResource(state, author_resource_id) {
  // Get a single auhor by resource from the resource index
  if (state.resourceStore.resources[author_resource_id]) {
    return state.resourceStore.resources[author_resource_id];
  }
  return undefined;
}



class ArticleDoober {

  getArticleBySlug(state, slug) {
    // Todo: store slug=>article mapping internally for more optimal lookup

    let resource;
    for (let resource_id in state.resourceStore.resources) {
      resource = state.resourceStore.resources[resource_id];
      if (resource.slug == slug) {
        return resource
      }

    }
    return false;
  }

  getArticles(state) {
    // Retreive a set of articles from the index based on their published status
    let resources = [];

    // Iterate over index of expected items
    for (let resource of state.articleLatestIndex.resources) {
      resources.push(resource); // Dumb version...
    }

    /*
    for (let resource_id of state.articleLatestIndex.resource_ids) {
      resources.push(state.resourceStore.resources[resource_id]);
    }
    */
    return resources;
  }

  getArticlesByCategorySlug(state) {
    // Retreive a set of articles from the index based on their published status
    let resources = [];

    console.log('getArticlesByCategorySlug');
    // Iterate over index of expected items
    for (let resource of state.articlesByCategorySlugIndex.resources) {
      resources.push(resource); // Dumb version...
    }

    /*
    for (let resource_id of state.articleLatestIndex.resource_ids) {
      resources.push(state.resourceStore.resources[resource_id]);
    }
    */
    return resources;
  }

  getArticlesByAuthorResource(state, author_resource_id) {
     // Retrieve a set of articles from the index by the author
    let resources = [];
    let resource_id;

    let index = state.articlesByAuthorResourceIndex[author_resource_id];

    // Check if index exists, otherwise this causes node server to stall out...
    if (!index) { return resources; }

    // Iterate over index of expected items
    for (resource_id of index.resource_ids) {
      resources.push(state.resourceStore.resources[resource_id]);
    }

    return resources;
  }

}



export function getArticles(state) {
  let doober = new ArticleDoober()
  return doober.getArticles(state)
}

export function getArticleBySlug(state, slug) {
  // Retrieve an article by slug from the pool

  let doober = new ArticleDoober()
  let p = doober.getArticleBySlug(state, slug)

  return p;
}

export function getArticlesByCategorySlug(state) {
  let doober = new ArticleDoober();
  return doober.getArticlesByCategorySlug(state)
}

export function getArticlesByAuthorResource(state, slug) {
  let doober = new ArticleDoober()
  return doober.getArticlesByAuthorResource(state, slug)
}


// Layout stuff
export const LAYOUT_TOGGLE_MENU = 'LAYOUT:TOGGLE_MENU'
export const LAYOUT_OPEN_MENU = 'LAYOUT:OPEN_MENU'
export const LAYOUT_CLOSE_MENU = 'LAYOUT:CLOSE_MENU'
export const LAYOUT_WIDE_CONTAINER = 'LAYOUT:WIDE_CONTAINER'
export const LAYOUT_THIN_CONTAINER = 'LAYOUT:THIN_CONTAINER'

// Resets the currently visible error message.
export function layoutToggleMenu() {

  return {
    type: LAYOUT_TOGGLE_MENU
  }
}

export function layoutOpenMenu() {
  return {
    type: LAYOUT_OPEN_MENU
  }
}

export function layoutCloseMenu() {
  return {
    type: LAYOUT_CLOSE_MENU
  }
}

export function layoutThinContainer() {
  return {
    type: LAYOUT_THIN_CONTAINER
  }
}

export function layoutWideContainer() {
  return {
    type: LAYOUT_WIDE_CONTAINER
  }
}
