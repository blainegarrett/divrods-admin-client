import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Provider from 'react-redux/lib/components/Provider';
import routes from '../routes';
import { Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import { ThemeProvider } from 'react-css-themr';
import theme from '../theme/theme.js';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    const asyncHelpers = this.props.asyncHelpers;
    //const filters = this.props.asyncFilters

    return (
      <ThemeProvider theme={theme} >
        <Provider store={store} key="provider">
          <Router render={(props) =>
            <ReduxAsyncConnect {...props} helpers={ asyncHelpers } />
        } history={history} routes={routes} />
        </Provider>
      </ThemeProvider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  asyncHelpers: PropTypes.object
};