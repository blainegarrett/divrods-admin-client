import * as LayoutActions from './actions';
import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';

const defaultState = {active:false, pinned: false};
function mainMenuReducer(state = defaultState, action) {
  switch(action.type) {
    case LayoutActions.LAYOUT_OPEN_MENU: {
      return Object.assign({}, state, {active:true});
    }
    case LayoutActions.LAYOUT_CLOSE_MENU:
    case LOCATION_CHANGE: {
      return Object.assign({}, state, {active:false});
    }
    case LayoutActions.LAYOUT_TOGGLE_MENU: {
        const is_open = state['active'];
        return Object.assign({}, state, {active:!is_open});
    }
    default:
      return state;
  }
}

const defaultState2 = {active:false, pinned: false, content: null};
function sideBarReducer(state = defaultState2, action) {
  switch(action.type) {
    case LayoutActions.LAYOUT_OPEN_SIDE: {
      return Object.assign({}, state, {pinned:true});
    }
    case LayoutActions.LAYOUT_CLOSE_SIDE:
    case LOCATION_CHANGE: {
      return Object.assign({}, state, {pinned:false});
    }
    case LayoutActions.LAYOUT_TOGGLE_SIDE: {
        const is_open = state['pinned'];
        return Object.assign({}, state, {pinned:!is_open});
    }
    case LayoutActions.LAYOUT_SET_CONTENT: {
      return Object.assign({}, state, {content:action.content});
    }
    default:
      return state;
  }
}

export default combineReducers({
  mainMenu: mainMenuReducer,
  sideBar: sideBarReducer
})