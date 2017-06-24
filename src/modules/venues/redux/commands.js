// Commands for Venues
import * as Actions from './actions';
import { API_DOMAIN } from '../../../constants';

export function fetchVenueBySlug(state, slug, verbose) {
    //console.log('fetchVenueBySlug (' + slug +  ' ) ....');

    // TODO: Figure out how to cache the query so we don't keep hitting server for 404s
    let resource = getVenueBySlug(state, slug);
    if (resource) {
        if (!verbose || (verbose && resource._meta.is_verbose)) {
            //console.log('YAY GOT IT!');
            return;
        }
        else {
            //console.log('Resource with slug ' + slug + ' found, but was not verbose.');
        }

        //console.log("HERE?");
    }

    console.log('I guess we\'re queryin...');

    return {
        types: [ Actions.VENUES_QUERY_REQUEST,
                 Actions.VENUES_QUERY_SUCCESS,
                 Actions.VENUES_QUERY_FAILURE ],
        promise: (client) => {
            return client.get(API_DOMAIN + '/api/venues?get_by_slug=' + slug + '&verbose=true');
        }
    }
}

export function getVenueBySlug(state, slug) {
    // Iterate over index of expected items
    //console.log('getVenueBySlug (' + slug +  ' ) ...');
    for (let resource_id in state.resourceStore2.resources) {
        var r = state.resourceStore2.resources[resource_id];

        if (r && r._meta.resource_type == 'Venue') {
            //console.log([r.slug, slug, r.slug == slug]);
            if (r.slug == slug) {
                return r;
            }
        }
    }
    return null;
}