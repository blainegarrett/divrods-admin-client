import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore, { history } from './redux/store';
import rootSaga from './redux/sagas';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
//import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';

import theme from './assets/react-toolbox/theme'
import './index.css';
import './assets/react-toolbox/theme.css';

// Page Routes
import Routes from './Routes';

const target = document.querySelector('#root')
const initialState = {};

const store = configureStore(initialState)
store.runSaga(rootSaga)

render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App routes={<Routes />} />
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  target
);
//TODO: We may want to do this eventually...
//registerServiceWorker();