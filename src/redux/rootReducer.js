import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import layoutReducers from './layout/reducers';
import { authStateReducer } from '../xauth/reducers';

export default combineReducers({
  routing: routerReducer,
  layout: layoutReducers,
  auth: authStateReducer
});