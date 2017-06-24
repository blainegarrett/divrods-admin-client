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

    /*
    const {
      nextPageUrl = `users/${login}/starred`,
      pageCount = 0
    } = getState().pagination.starredByUser[login] || {}

    if (pageCount > 0 && !nextPage) {
      return null
    }
    */
    //if here still...
    return this.fetch(nextCursor);
  }
  getPageCollection(state) {
    const coreIndex = state.pagination[this.constructor.getIndexName()]
    return coreIndex[this.queryKey] || {};
  }
}



export class RulesetsManager extends BaseDoober {
  static getIndexName() { return 'RulesetsManager'; }
  getKind() { return 'Venues'; }
  static _actionTypes = [Actions.RULESETS_REQUEST, Actions.RULESETS_SUCCESS, Actions.RULESETS_FAILURE]

  static getActionTypes() {
    return RulesetsManager._actionTypes;
  }
  constructor(params) {
    super(params);

    this.baseUrl = PREF_SERVICE_DOMAIN + '/api/rest/v1.0/rulesets?verbose=true';
    this.defaultParams = {limit:25, verbose:true}
    this.init()
  }
}

// Use em if we got em
export const loadRulesets = (nextCursor) => (dispatch) => {
  // TODO: See if we can make this a static method on PreferencesManager
  // Note: Page Limit must be the same  or else things won't work
  var doober = new RulesetsManager({limit:100});
  return dispatch(doober.load(nextCursor));
}


// Rules Managers
export class RulesManager extends BaseDoober {
  static getIndexName() { return 'RulesManager'; }
  getKind() { return 'Venues'; }
  static _actionTypes = [Actions.RULES_REQUEST, Actions.RULES_SUCCESS, Actions.RULES_FAILURE]

  static getActionTypes() {
    return RulesManager._actionTypes;
  }
  constructor(params) {
    super(params);

    this.baseUrl = PREF_SERVICE_DOMAIN + '/api/rest/v1.0/recommendations';
    this.defaultParams = {limit:25, verbose:true}
    this.init()
  }
}

// Use em if we got em
export const loadRules = (ruleset_id, nextCursor) => (dispatch) => {
  // TODO: See if we can make this a static method on PreferencesManager
  // Note: Page Limit must be the same  or else things won't work

  var doober = new RulesManager({ruleset_id: ruleset_id, limit:100});
  return dispatch(doober.load(nextCursor));
}


// Commands
export function generateRuleSet(min_support, min_confidence, make_default) {
  return {
      types: [ Actions.GENERATE_RULESET_REQUEST, Actions.GENERATE_RULESET_SUCCESS, Actions.GENERATE_RULESET_FAILURE ],
      promise: (client) => {
          return client.post(PREF_SERVICE_DOMAIN + '/api/rest/v1.0/rulesets?verbose=true&min_support=' +  min_support + '&min_confidence=' + min_confidence + '&make_default=' + make_default );
      }
  }
}
