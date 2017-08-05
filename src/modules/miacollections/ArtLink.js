import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../miacollections';

class ArtLink extends Component {
  render() {
    return (<a href={'https://collections.artsmia.org/art/' + this.props.id + '/'}
               onClick={(e) => {e.preventDefault(); this.props.showArtwork(this.props.id)}}>{ this.props.id }</a>);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showArtwork: bindActionCreators((artwork_id) => ({type: actions.INIT_SHOW_ARTWORK, artwork_id}), dispatch)
  };
}

function mapStateToProps() { return {}; }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtLink);

ArtLink.propTypes = {
  id: PropTypes.string,
  showArtwork: PropTypes.func
}
