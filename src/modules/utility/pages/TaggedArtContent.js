import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from './Grid';
import { actions } from '../../utility';

class TaggedArtContent extends Component {
  componentWillMount() {
    this.props.loadPreferenceData();
  }
  render() {

    return (
      <div>
        <Grid entities={this.props.entities} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  //const { pagination: { prefs }, } = state;

  console.log(state);
  let entities = [];
  return {entities};
}

function mapDispatchToProps(dispatch) {
  return {
    loadPreferenceData: bindActionCreators(() => ({type: actions.INIT_LOAD_TAGGED_ART}), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaggedArtContent);

TaggedArtContent.propTypes = {
  loadPreferenceData : PropTypes.func, // bound action creator
  entities: PropTypes.array
};