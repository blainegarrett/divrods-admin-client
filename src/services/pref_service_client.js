// Prefs service client wrapper
// Note: If you need to talk to a different service, probably make a new service

import 'isomorphic-fetch';
import { PREF_SERVICE_DOMAIN } from '../constants';

function makeQueryString(params) {
  let esc = encodeURIComponent;
  let query = Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');

  if (query)
    return '?' + query;
  return ''
}

function buildQueryParamHash(url, params) {
  let keys = Object.keys(params);
  keys.sort();

  let s = url;
  let key;
  let val;

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    val = params[key];

    s += '::' + key + '::' + val;
  }
  return _hashCode(s);
}

function _hashCode(string) {
  var hash = 0, i, chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function callApi(endpoint, params, data, method, skip_auth_header=false) {
  //const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  // Resolve the url
  //const is_https = window.location && window.location.protocol == 'https:';
  //const fullUrl = (is_https ? 'https://' : 'http://') + PREF_SERVICE_DOMAIN + endpoint;
  const baseUrl = PREF_SERVICE_DOMAIN + endpoint;
  const fullUrl = baseUrl + makeQueryString(params);

  // Hash can be used to cache queries... not currently in use?
  const hash = buildQueryParamHash(baseUrl, params)

  // Determine headers
  let options = {method: method};
  options['headers'] = {'Accept': 'application/json', 'Content-Type': 'application/json'}

  // If we are authenticated, attach the access_token
  if (!skip_auth_header) {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      options['headers']['Authorization'] = 'Bearer ' + access_token;
    }
  }

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
      return {results: json.results, cursor: json.cursor, more: json.more, hash: hash}
    })
    .then(
      response => ({response}),
      function(error) { console.log(error); return ({error: error.messages[0] || 'Something bad happened'}) }
    )
}

// Clean a cursor for use in the api - empty string is fine
const cleanCursor = cursor => !cursor ? '' : cursor;

// Rename this to something "authenticate"
export function fetchUser({provider_data}) {
  return callApi('/api/auth/authenticate', {}, provider_data, 'POST', true);
}

export function fetchPrefs({next_cursor = ''}) {
  return callApi('/api/rest/v1.0/preferences', {cursor: cleanCursor(next_cursor), verbose:true, limit:50}, {}, 'GET');
}

export function fetchRulesets({next_cursor = ''}) {
  return callApi('/api/rest/v1.0/rulesets', {cursor: cleanCursor(next_cursor), verbose:true, limit:50}, {}, 'GET');
}

export function fetchRulesetRules({ruleset_id, next_cursor = ''}) {
  return callApi('/api/rest/v1.0/recommendations', {ruleset_id: ruleset_id, cursor: cleanCursor(next_cursor), verbose:true, limit:50}, {}, 'GET');
}

export function fetchUsers({next_cursor = ''}) {
  return callApi('/api/auth/users', {cursor: cleanCursor(next_cursor), verbose:true, limit:50}, {}, 'GET');
}

export function generateRuleset({min_support, min_confidence, make_default}) {
  return callApi('/api/rest/v1.0/rulesets', {min_support, min_confidence, make_default, verbose:true}, {}, 'POST')
}

export function createUser({username, first_name, last_name, email}) {
  return callApi('/api/auth/users', {verbose:true}, {username, first_name, last_name, email}, 'POST')
}
export function setPassword({user_resource_id, password}) {
  return callApi('/api/auth/users/' + user_resource_id + '/logins', {verbose:true}, {'auth_key': 'ignored_on_create?', 'auth_type': 'basic', 'auth_data': password}, 'POST')
}