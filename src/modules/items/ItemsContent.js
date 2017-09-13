import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { action } from '../../redux/actions';
import { actions as item_actions } from './redux';
import Button from 'react-toolbox/lib/button/Button';
import Grid from './Grid';

class ItemsContent extends Component {
  componentWillMount() {
    this.props.loadItemData();
  }
  render() {
    let next_cursor = this.props.next_cursor;
    let more = this.props.more;
    return (
      <div>
        <Grid entities={this.props.entities} />
        { more && (<div style={{textAlign:'center', paddingTop:'20px'}}><Button onClick={() => this.props.loadItemData(next_cursor) } primary raised>Load More</Button></div>) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { pagination: { pref_items }, } = state;

  let entities = [];
  let more = false;
  let next_cursor = undefined;

  const paginator = pref_items.all;
  if (paginator) {
    more = paginator.more;
    entities = paginator.ids;
    next_cursor = paginator.cursor;
  }

  return {entities, more, next_cursor};
}

function mapDispatchToProps(dispatch) {
  return {
    loadItemData: bindActionCreators((next_cursor) => action(item_actions.LOAD_PREF_ITEMS_PAGE, {next_cursor}), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsContent);


ItemsContent.propTypes = {
  loadItemData : PropTypes.func, // bound action creator
  next_cursor : PropTypes.string, // next page cursor string
  more : PropTypes.bool, // if there are more entities to load
  entities: PropTypes.array
};