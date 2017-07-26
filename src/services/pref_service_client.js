// Prefs service client wrapper

import 'isomorphic-fetch';
import { PREF_SERVICE_DOMAIN } from '../constants';



function callApi(endpoint, data, method='GET') {
  //const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  const is_https = false; // TODO!!!

  const fullUrl = (is_https ? 'https://' : 'http://') + PREF_SERVICE_DOMAIN + endpoint;

  let options = {method: method};

  options['headers'] = {'Accept': 'application/json', 'Content-Type': 'application/json'}
  options['body'] = JSON.stringify(data);

  return fetch(fullUrl, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      //const camelizedJson = camelizeKeys(json)
      const nextPageUrl = null; //getNextPageUrl(response)

      return Object.assign({},
        json.results,
        { nextPageUrl }
      )
    })
    .then(
      response => ({response}),
      error => ({error: error.messages[0] || 'Something bad happened'})
    )

}

export function fetchUser(data) {
  return callApi('/api/auth/authenticate', data, 'POST');
}
//export const fetchUser = login => callApi(`users/${login}`, userSchema)