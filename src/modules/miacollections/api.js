// Prefs service client wrapper
// See https://github.com/artsmia/collection-elasticsearch for api documentation
import 'isomorphic-fetch';
import { MIA_SEARCH_HOST } from '../../constants';

function makeQueryString(params) {
  let esc = encodeURIComponent;
  let query = Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');

  if (query)
    return '?' + query;
  return ''
}

function callApi(endpoint, params, data, method) {
  //const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  // Resolve the url
  //const is_https = window.location && window.location.protocol == 'https:';
  //const fullUrl = (is_https ? 'https://' : 'http://') + PREF_SERVICE_DOMAIN + endpoint;
  const baseUrl = MIA_SEARCH_HOST + endpoint;
  const fullUrl = baseUrl + makeQueryString(params);

  // Determine headers
  let options = {method: method};
  options['headers'] = {'Accept': 'application/json', 'Content-Type': 'application/json'}

  // Handle Body/Payload - Note: GET, HEAD, DELETE do not accept payloads
  if (method !== 'GET')
    options['body'] = JSON.stringify(data);

  // Make request and call appropriate callbacks
  return fetch(fullUrl, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return {results: json}
    })
    .then(
      response => ({response}),
      function(error) {
        // Handle network error
        console.error(error);
        if (error.messages) {
          return ({error: error.messages[0] || 'Something bad happened'})
        }
        return ({error: error.messages || 'Something bad happened'})
      }
    )
}

// Fetch a piece of artwork from the mia elastic search
export function loadArtwork({artwork_id}) {
  return callApi('/id/' + artwork_id , {}, {}, 'GET');
}
