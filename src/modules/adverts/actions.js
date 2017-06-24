// Advertisement Redux Actions

export const ADVERT_REQUEST = 'ADVERT:REQUEST';
export const ADVERT_SUCCESS = 'ADVERT:SUCCESS';
export const ADVERT_FAILURE = 'ADVERT:FAILURE';
export const ADSPOT_LOAD = 'ADSPOT:LOAD';

export function displayAd(adspot_id) {
  return {
    type: ADSPOT_LOAD,
    adspot_id: adspot_id
  }
}

export function getAdvertRandomResource(state) {

  // TODO: There is probably a better way to get a random item from a dict
  var resource_array = [];
  for (var i in state.advertStore.resources) {
    resource_array.push(state.advertStore.resources[i]);
  }

  if (resource_array.length > 0) {
    return resource_array[Math.floor(Math.random()*resource_array.length)];
  }

  return null;
}

export function fetchAdvertResources(state) {
  return { type: ADVERT_SUCCESS }
}

export function loadAdForAdspot(adspot_id, state) {
  return {
    type: ADSPOT_LOAD,
    adspot_id: adspot_id
  }
}
export function getAdForAdspot(adspot_id, state) {
  if (state && state.advertStore && state.advertStore.adspots) {
    return state.advertStore.adspots[adspot_id];
  }
  return null;
}