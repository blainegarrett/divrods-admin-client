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

export default combineReducers({
  mainMenu: mainMenuReducer
})