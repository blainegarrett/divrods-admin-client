import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageLink from '../../../containers/PageLink';

export default class Pod extends Component {
  render () {
    let r = this.props.resource; // TODO: Handle case where it doesn't exist...?

    // Determine if there is an image to display
    let image = null;
    let image_url = null;

    if (r.primary_image_resource) {
      image_url = r.primary_image_resource.versions.CARD_SMALL.url;
      image = <PageLink to={r.permalink} title={r.title} ><img src={image_url} className="img-responsive" /></PageLink>
    }

    return (
      <div className="card-container">
        <div className="card-header">
            <div className="card-image">
              { image }
            </div>
          </div>

          <div className="card-content">
            <div className="card-title">
              <PageLink to={ r.permalink }>{r.title }</PageLink>
            </div>
            <div className="card-detail">{ r.summary } <b><PageLink to={r.permalink} title={r.title}>Read More...</PageLink></b></div>
          </div>
      </div>
    );
  }
}

Pod.propTypes = {
  resource: PropTypes.object.isRequired
}