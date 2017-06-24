import { createStore, applyMiddleware, compose } from 'redux';
import api from '../middleware/api';
import rootReducer from '../reducers';
import { reduxAsyncConnect } from 'redux-connect';
//import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';

function clientMiddleware(client) {

  return ({dispatch, getState}) => {

    return next => action => {

      // Case: Async action didn't need to fire - HACKY?
      if (!action) { return; }

      // Case: Thunk - non promise-centric async action
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      const actionPromise = promise(client);

      actionPromise.then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        next({...rest, error, type: FAILURE});
      });

      return actionPromise;
    };
  };
}



export default function configureStore(initialState, history, client) {

  const reduxRouterMiddleware = routerMiddleware(history);

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(clientMiddleware(client), reduxRouterMiddleware)
    )
  )

  return store
}
