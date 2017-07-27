// Prefs service client wrapper

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

function callApi(endpoint, params, data, method='GET') {
  //const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  // Resolve the url
  const is_https = window.location && window.location.protocol == 'https:';
  //const fullUrl = (is_https ? 'https://' : 'http://') + PREF_SERVICE_DOMAIN + endpoint;
  const fullUrl = PREF_SERVICE_DOMAIN + endpoint + makeQueryString(params);

  // Hash can be used to cache queries... not currently in use?
  const hash = buildQueryParamHash(PREF_SERVICE_DOMAIN + endpoint, params)

  // Determine headers
  let options = {method: method};
  options['headers'] = {'Accept': 'application/json', 'Content-Type': 'application/json'}

  const access_token = localStorage.getItem('access_token');
  if (access_token) {
    options['headers']['Authorization'] = 'Bearer ' + access_token;
  }

  // Handle Body
  if (method != 'GET')
    options['body'] = JSON.stringify(data);

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

// Rename this to something "authenticate"
export function fetchUser(data) {
  return callApi('/api/auth/authenticate', {}, data, 'POST');
}

export function fetchPrefs(cursor = '') {
  return callApi('/api/rest/v1.0/preferences', {cursor, verbose:true, limit:5}, {}, 'GET');
}

export function fetchRulesets(cursor) {
  return callApi('/api/rest/v1.0/auth/rulesets', {cursor, verbose:true}, {}, 'GET');
}

export function fetchRulesetRules(ruleset_id, cursor) {
  return callApi('/api/rest/v1.0/auth/rulesets/' + ruleset_id, {cursor, verbose:true}, {}, 'GET');
}

export function fetchUsers(cursor) {
  return callApi('/api/auth/users', {cursor, verbose:true}, {}, 'GET');
}


//export const fetchUser = login => callApi(`users/${login}`, userSchema)