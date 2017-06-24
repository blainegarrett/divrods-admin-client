import Immutable from 'immutable';
import * as Actions from '../actions'

//const defaultState = new Immutable.Map({menu_open:false, container_wide: false});

/*
const defaultState = new Immutable.Map({menu_open:false, container_wide: false});
export default function layoutReducer(state = defaultState, action) {
  switch(action.type) {
    case Actions.LAYOUT_OPEN_MENU:
      return new Immutable.Map(Object.assign({}, state, {menu_open:true}));
    case Actions.LAYOUT_CLOSE_MENU:
      return new Immutable.Map(Object.assign({}, state, {menu_open:false}));
    case Actions.LAYOUT_TOGGLE_MENU:
        const is_open = state['menu_open'];
        return new Immutable.Map(Object.assign({}, state, {menu_open:!is_open}));
    case Actions.LAYOUT_WIDE_CONTAINER:
      return new Immutable.Map(Object.assign({}, state, {container_wide:true}));
    case Actions.LAYOUT_THIN_CONTAINER:
      return new Immutable.Map(Object.assign({}, state, {container_wide:false}));
    default:
      return state;
  }
}
*/



const defaultState = {menu_open:false, is_fluid: false};
export default function layoutReducer(state = defaultState, action) {
  switch(action.type) {
    case Actions.LAYOUT_OPEN_MENU:
      return Object.assign({}, state, {menu_open:true});
    case Actions.LAYOUT_CLOSE_MENU:
      return Object.assign({}, state, {menu_open:false});
    case Actions.LAYOUT_TOGGLE_MENU:
        const is_open = state['menu_open'];
        return Object.assign({}, state, {menu_open:!is_open});
    default:
      return state;
  }
}
