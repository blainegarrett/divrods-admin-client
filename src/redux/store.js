import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import rootReducer from './rootReducer';
import createSagaMiddleware, { END } from 'redux-saga';

export const history = createHistory();
export default function configureStore(initialState) {
  const history = createHistory();
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [
    sagaMiddleware,
    routerMiddleware(history)
  ]

  // Redux Tools
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store;
}