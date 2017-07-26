import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import rootReducer from './rootReducer';
import createSagaMiddleware, { END } from 'redux-saga';

export const history = createHistory();
export default function configureStore(initialState) {
  const history = createHistory();
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [
    //thunk,
    sagaMiddleware,
    routerMiddleware(history)
  ]

  // Redux Tools
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
  );

  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
  );

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store;
}