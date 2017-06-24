import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageLink from '../../containers/PageLink';

// TODO: Replace this with the ./components/Pod
class PodRenderer extends Component {
  render () {
    return (<div>not implemented</div>)
  }
}
PodRenderer.propTypes = {
  resource: PropTypes.object.isRequired
}

// TODO: Move this to its own file within ./components
class FeaturedHeroRenderer extends Component {
  render () {
    const resource = this.props.resource;
    //const styles = {};
    // TODO: Need a default card image...
    let image_url = '';

    if (resource.primary_image_resource) {
      image_url = resource.primary_image_resource.versions.CARD_SMALL.url;
    }

    const styles = { 'backgroundImage' : 'url(' + image_url + ')'};

    // TODO: Case out if published or not...?
    //const m = moment(resource.published_date);
    //const date_slug = m.format('YYYY/MM/');

    return (
      <div className="jive-card">
        <div className="jive-card-image">
          <PageLink to={ resource.permalink } data-ga-category="featured-pod-click" data-ga-label={ resource.title } style={ styles }>
            <div className="jive-card-title">
              <br />
              <div className="date">New Post</div>
              <div className="title">{ resource.title }</div>
            </div>
          </PageLink>
        </div>
      </div>
    );
  }
}
FeaturedHeroRenderer.propTypes = {
  resource: PropTypes.object.isRequired
}


class Goober extends Component {
  /* Goober for Article - Handles listeners, etc */
  /* TODO: Add Default renderer? */

  render () {
    // Determine which ED we meant to show actually
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
    Goober, FeaturedHeroRenderer, PodRenderer
}