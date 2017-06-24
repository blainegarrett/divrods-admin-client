import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageLink from '../../containers/PageLink';
import FeaturedHeroRenderer from './components/FeaturedHeroRenderer';
import PodRenderer  from './components/PodRenderer';
import GalleryRenderer  from './components/GalleryRenderer';

class Goober extends Component {
  /* Goober for Article - Handles listeners, etc */
  /* TODO: Add Default renderer? */

  render () {
    let props = {
      resource: this.props.resource
    };
    return React.createElement(this.props.renderer, props);
  }
}

Goober.propTypes = {
  resource: PropTypes.object.isRequired,
  renderer: PropTypes.func
}

export default {
    Goober, FeaturedHeroRenderer, PodRenderer, GalleryRenderer
}