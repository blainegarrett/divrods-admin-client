// Note: This is a modified version of https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/helpers/ApiClient.js
// Biggest change was adding a callback option to the call args
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import superagent from 'superagent';
//import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  if (__SERVER__) {
    return 'http://' + path; // TODO: We need to figure out node's SSL issue
  }

  if (__CLIENT__  && window.location && window.location.protocol == 'https:') {
    return 'https://' + path;
  }
  return 'http://' + path;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */

class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data, attach, callback } = {}) => new Promise((resolve, reject) => {
        //const request = fetch(formatUrl(path));
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (attach) {
          for (const [fieldName, file] of Object.entries(attach)) {
            request.attach(fieldName, file);
          }
        }

        // Add the access_token (in present) to the request headers.
        if (global.__CLIENT__ && localStorage) {
            console.log(localStorage.getItem('access_token'))
            const access_token = localStorage.getItem('access_token');
            if (access_token) {
              request.set('Authorization', 'Bearer ' + access_token);
            }
        }


        //if (__SERVER__ && req.get('cookie')) {
        //  request.set('cookie', req.get('cookie'));
        //}

        if (global.__CLIENT__) {
          request.withCredentials()
        }

        if (data) {
          request.send(data);
        }

        request.end(function(err, { body } = {}) {
          if (err) {
            console.log(err);
            return reject(body || err)
          }

          // Hacky? I added this to get an "edge" into the API to update localStorage
          if (callback) {
            callback(body)
          }
          return resolve(body);
          //err ? reject(body || err) : resolve(body)
        });

        //request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}


// Helper code for checking memcache serverside given a set of params - see est.utils in api module

/*
    // Fiddledinkin
    let params = {category_slug: "exhibition-reviews", limit: "2", "author_resource_id": "VXNlch4fNTc4NTkwNTA2MzI2NDI1Ng"};
    let param_keys = Object.keys(params);
    let sorted_keys = param_keys.sort(); // TODO: case?
    let sorted_params = [];
    for (let i =0; i < sorted_keys.length; i++) {
      let param_key = sorted_keys[i];
      sorted_params.push([param_key, params[param_key]]);
    }

    console.log(sorted_params);
    let json_str = JSON.stringify(sorted_params); //.replace(new RegExp('","', 'g'), '", "').replace(/\\],\\[/g, '], [');
    console.log(json_str)
    console.log(SparkMD5.hash(json_str));


    // [["author_resource_id","VXNlch4fNTc4NTkwNTA2MzI2NDI1Ng"],["category_slug","exhibition-reviews"],["limit","2"]]
    // [["author_resource_id", "VXNlch4fNTc4NTkwNTA2MzI2NDI1Ng"], ["category_slug", "exhibition-reviews"], ["limit", "2"]]

    // 4df7d5f68424e38a21325d30809cc10c pythonside
    // 4c30dcc5d73a8b1201429ea0e9cbaaaf client
    // 4c30dcc5d73a8b1201429ea0e9cbaaaf server

*/


const ApiClient = _ApiClient;

export default ApiClient;