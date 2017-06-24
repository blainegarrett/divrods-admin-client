import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageLink from '../../containers/PageLink';

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