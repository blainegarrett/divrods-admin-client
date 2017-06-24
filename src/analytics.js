/* Simple Analytics wrapper ga is assumed to be in the global scope */
import {GOOGLE_ANALYTICS_ID} from './constants';

export function create_tracker() {
  /// Wrapper for ga.create

  // Note: global.ga may not be loaded yet OR might be blocked
  // TODO: If global.ga not loaded, async attempt to retry after x times or perm fail

  if (global.ga) {
      global.ga('create', GOOGLE_ANALYTICS_ID, {'cookieDomain': 'none' });
  }

}
export function set_page(url, title) {
  if (global.ga) {
    global.ga('set', { page: url, title: title });
  }
}

export function record(hitType, opt_fieldObject) {
  /* General Purpose Recording helper */

  if (global.ga) {
    global.ga('send', hitType, opt_fieldObject);
  }

  // Uncomment for logging
  //console.log('sending ' + hitType + '.');
  //console.log(opt_fieldObject)
}


export function record_event(eventCategory, eventAction, eventLabel, eventValue) {
  // Wrapper for event recording
  //console.log(this);
  var data = {
    'eventCategory': eventCategory,   // Required.
    'eventAction': eventAction,      // Required.
    'eventLabel': eventLabel,
    'eventValue': eventValue
  };

  record('event', data);
}