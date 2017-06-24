import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/components/connect';
import { asyncConnect } from 'redux-connect';
import {Row, Col} from '../../lib/grid';
import Footer from '../../components/layout/Footer';
import PageBase from '../PageBase';
import PageLink from '../../containers/PageLink';

import GalleryRenderer from '../../modules/venues/components/GalleryRenderer';
import { getVenueBySlug, fetchVenueBySlug } from '../../modules/venues/redux/commands';
import { loginRequired } from '../../xauth/decorators';

import ListViewPage from './ListViewPage';

@loginRequired('admin')
class PreferencesPageShell extends Component {
  render() {
    return (
      <div className="PreferencesPageShell">
        { this.props.children }
      </div>
    );
  }
}

PreferencesPageShell.propTypes = {
  children: PropTypes.object,
}

export { PreferencesPageShell, ListViewPage };