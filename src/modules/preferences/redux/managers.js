// Managers
import * as Actions from './actions';
import { PREF_SERVICE_DOMAIN } from '../../../constants';


class BaseDoober {
  getKind() { return 'unknown'; }

  constructor(params) {

    // Clean params
    this.defaultParams = {};
    this.initParams = params || {}
    this.params = {};
    this.intialized = false;
    this.queryKey = 'notGenerated'; // TODO: Make constant...
  }

  init() {
    // Merge Params
    let params = Object.assign({}, this.defaultParams, this.initParams);

    // Clean & Store Params
    for(var p in params) {
      if (params.hasOwnProperty(p) && params[p] != undefined) {
        this.params[p] = params[p];
      }
    }

    // Regardless of params, create a hash
    this.queryKey = this._hashCode(this.baseUrl) + '.' + this.buildQueryParamHash(this.params);
  }

  static getActionTypes() {
    return [];
  }

  buildQueryParamHash(params) {
    let keys = Object.keys(params);
    keys.sort();

    let s = this.getKind(); // just for additional hashing;
    let key;
    let val;

    for (let i = 0; i < keys.length; i++) {
      key = keys[i];
      val = params[key];

      s += '::' + key + '::' + val;
    }
    return  this._hashCode(s);
  }

  _hashCode(string) {
    var hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  getFullUrl(cursor) {
    var str = [];

    let params = Object.assign({}, this.params, {cursor});

    for(var p in params) {
         if (params.hasOwnProperty(p) && params[p] != undefined) {
             str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
        }
    }

    return this.baseUrl + '?' + str.join('&');
  }

  fetch(nextCursor) {
    return {
        urlKey: this.queryKey, // does Not includes cursor
        pageKey: nextCursor || 'initial',
        types: this.constructor.getActionTypes(), // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
        promise: (client) => {
          return client.get(this.getFullUrl(nextCursor));
        }
    };
  }

  load(nextCursor) {
    return this.fetch(nextCursor);
  }
  getPageCollection(state) {
    const coreIndex = state.pagination[this.constructor.getIndexName()]
    return coreIndex[this.queryKey] || {};
  }
}

export class PreferencesManager extends BaseDoober {
  static getIndexName() { return 'PreferencesManager'; }
  getKind() { return 'Venues'; }
  static _actionTypes = [Actions.PREFERENCES_REQUEST, Actions.PREFERENCES_SUCCESS, Actions.PREFERENCES_FAILURE]

  static getActionTypes() {
    return PreferencesManager._actionTypes;
  }
  constructor(params) {
    super(params);

    this.baseUrl = PREF_SERVICE_DOMAIN + '/api/rest/v1.0/preferences';
    this.defaultParams = {limit:25, verbose:true}
    this.init()
  }
}

// Use em if we got em
export const loadPreferences = (nextCursor) => (dispatch) => {
  // TODO: See if we can make this a static method on PreferencesManager
  // Note: Page Limit must be the same  or else things won't work
  var doober = new PreferencesManager({limit:100});
  return dispatch(doober.load(nextCursor));
}

