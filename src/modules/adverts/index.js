// Adverts Module
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExternalLink from '../../containers/ExternalLink';

import connect from 'react-redux/lib/components/connect';
import { displayAd } from './actions'

class Goober extends Component {
  /* Goober for Advertisements - Handles listeners, etc */

  render () {
    let props = { resource: this.props.resource };
    return React.createElement(this.props.renderer, props);
  }
}

Goober.propTypes = {
  resource: PropTypes.object,
  renderer: PropTypes.func,
};

/* Renderer function for Rendering an Advertisemet in a Pod Card */
function PodRenderer({resource}) {
  if (!resource) {
    return (<div></div>);
  }

  // Determine scaling size of ad graphic
  let w = resource.image_width;
  let h = resource.image_height;

  // Calculate % height to 2 decimal places
  let scale_h = Math.floor(100 * h/w * 100.00) /100.00;
  const styles = {'padding': scale_h + '% 0 0 0' };

  return (
    <div className="card-container module-advert">
      <div className="card-header">
        <div className="card-image fixed-size">
          <ExternalLink data-ga-category="advert"
                        style={styles}
                        data-ga-action="click"
                        data-ga-label={resource.advert_label}
                        title={resource.advert_description}
                        href={resource.goto_url} target="_new">
            <img className="img-responsive"
                 src={resource.image_url}
                 alt={resource.advert_description } />
          </ExternalLink>
        </div>
        <div className="sponsor-text">{ resource.advert_type_label || 'advertisement' }</div>
      </div>
    </div>
  );
}
PodRenderer.propTypes = {
  resource: PropTypes.object
};


function mapStateToProps(state, ownProps) {
  let advert_resource;
  let advert_resource_id = state.advertStore.adspots[ownProps.adspot_id];

  if (advert_resource_id) {
    advert_resource = state.advertStore.resources[advert_resource_id];
  }

  return {advert_resource: advert_resource };
}

function mapDispatchToProps(dispatch) {
  return {
    displayAd: function(adspot_id){ dispatch(displayAd(adspot_id)); }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class AdSpotLoader extends Component {
  componentDidMount () {
    // Called only for initial render on client
    this.props.displayAd(this.props.adspot_id);
  }
  shouldComponentUpdate() {
    // Called on renderings after the initial
    this.props.displayAd(this.props.adspot_id);
    return true;
  }

  render () {

    if (this.props.advert_resource) {
      let advertClasses = ['card', 'hoverable'];
      if (this.props.adspot_id.indexOf('mobile') >= 0) { // TODO: Make a registry of ad types...
        advertClasses.push('hide-on-med-and-up');
      }

      return (
        <div className={advertClasses.join(' ')}>
          <Goober resource={this.props.advert_resource} renderer={ PodRenderer} />
        </div>
      );
    }
    else {
      // Initial server rendered page load for example..
      return null;
    }
  }
}

AdSpotLoader.propTypes = {
  adspot_id: PropTypes.string,
  advert_resource: PropTypes.object,
  displayAd: PropTypes.func
};


export default {
    Goober, PodRenderer, AdSpotLoader
}