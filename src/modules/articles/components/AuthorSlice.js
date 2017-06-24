import React, {Component} from 'react';
import PropTypes from 'prop-types';

/* Note: This is intended to be used at the footer of articles for the author info - not in use yet. */

export default class AuthorSlice extends Component {
  render() {
    return(
    <div className="card-panel grey lighten-5 z-depth-1">
      <div className="row valign-wrapper">
        <div className="col s4 m2">
          <img src="http://lorempixel.com/100/100/nature/" alt="" className="circle responsive-img valign" />
        </div>
        <div className="col s8 m10">
          <span className="black-text">
            XXXSuper Duper dude is a super dude and also super. Checkout their website. <br /><a href={ this.props.resource.website }>website</a>
          </span>
        </div>
      </div>
    </div>
    );
  }
}

AuthorSlice.propTypes = {
  // Injected by React Redux
  resource: PropTypes.object.isRequired
}