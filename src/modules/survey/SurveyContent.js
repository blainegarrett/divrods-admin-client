import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { action } from '../../redux/actions';
import { actions as survey_actions } from './redux';
import { actions as miacollectionActions} from '../miacollections';
import Button from 'react-toolbox/lib/button/Button';
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';
import ArtLink from '../miacollections/ArtLink';

function format_items(item_list) {
  return item_list.map(function(item, i) {
    let pref_icon = 'thumb_down';
    if (item.pref === true) { pref_icon = 'thumb_up'; }

    return (
      <Chip key={'chip' + i}>
        <Avatar icon={ pref_icon } />
        <span><ArtLink id={item.item_id} /></span>
      </Chip>
    )
  });
}


class SessionPreferenceLust extends Component {

  render() {
    if (this.props.items.length === 0) {
      return null;
    }

    return (
      <div>
        <hr />
        Preferences This Session:<br />
        { format_items(this.props.items) }
        <p>Note: Your session will auto cycle after 5 preferences</p>
      </div>
      )
  }
}
SessionPreferenceLust.propTypes = {
  items : PropTypes.array,
}

class ItemPrompt extends Component {
  render() {
    return (
      <div>
      <br /><br />
        <h2>Set Preference (Artwork Id: { this.props.item.item_id })</h2>
        <p>What do you think of this artwork?</p>
        <div style={{textAlign:'center', paddingTop:'20px'}}>
          <Button onClick={() => { this.props.propsSubmitPref(this.props.item.item_id, false) }} icon='thumb_down' raised>I dislike it</Button>
          <Button onClick={() => { this.props.propsSubmitPref(this.props.item.item_id, true) }} icon='thumb_up' primary raised>I like it</Button>
        </div>
        <br /><br />
        <br /><br />
      </div>);
  }
}

ItemPrompt.propTypes = {
  item : PropTypes.object,
  propsSubmitPref: PropTypes.func
}

class SurveyContent extends Component {
  componentWillMount() {
    this.props.initSurveyData();
  }

  render() {
    let surveyItemPrompt = this.props.surveyItemPrompt;

    let itemPrompt;
    if (surveyItemPrompt) {
      itemPrompt = (<ItemPrompt item={surveyItemPrompt} propsSubmitPref={this.props.propsSubmitPref} loadPanel={ this.props.loadPanel } />)
    }

    return (
      <div>
        <div style={{ border: '1px solid #ccc', padding: '20px', 'overflow': 'auto'}}>
          <div><b>Current Session</b></div>
          <div style={{float: 'left'}}>
            <div>User/Session Id: { this.props.surveySessionData.user_id }</div>
            <div>Total Preferenced: { this.props.surveySessionData.preferenced_items.length }</div>
          </div>

          <div style={{float: 'right'}}>
            <Button onClick={() => { this.props.initSurveyData() }} icon='autorenew' raised>New Session</Button>
            </div>
        </div>

        { itemPrompt }

        { /* }
        <div style={{width:'50%', 'float': 'left'}}>
        Survey Artwork {
          this.props.surveyItems.map((e) => (<li key={'xxasdf-' + e.item_id}>{e.item_id}</li>))
        }</div>

        <div style={{width:'50%', 'float': 'left'}}>
        Tagged Artwork {
          this.props.taggedArtworkEntities.map((e) => (<li key={'asdf-' + e.artid}>{e.artid}</li>))
        }</div>

        <div style={{width:'50%', 'float': 'right'}}>
        Preferenced {
          this.props.prefItemEntities.map((e, i ) => (<li key={'sdfsdd-' + i}>{e.item_id}</li>))
        }</div>

        { */ }

        <SessionPreferenceLust items={this.props.surveySessionData.preferenced_items} />

      </div>
    );
  }
}


function mapStateToProps(state) {

  // Get the tagged artworks
  let taggedArtworkEntities = state.utilityService.taggedArtwork.index;

  // Get any preference items for the above tagged artworks (logic in the survey.reudx.saga)
  const { pagination: { explicit_pref_items }, } = state;
  const paginator = explicit_pref_items.all;
  let prefItemEntities = [];
  if (paginator) {
    prefItemEntities = paginator.ids;
  }

  // Collated survey items
  let surveyItems = state.surveyReducers.surveyItemReducer.index;
  let surveyItemPrompt = state.surveyReducers.surveyItemPromptReducer;

  let surveySessionData = state.surveyReducers.surveySession;
  return {taggedArtworkEntities, prefItemEntities, surveyItems, surveyItemPrompt, surveySessionData};

}

function mapDispatchToProps(dispatch) {
  return {
    initSurveyData: bindActionCreators(() => action(survey_actions.INIT_SURVEY_PAGE, {}), dispatch),
    loadPanel: bindActionCreators((artwork_id) => ({type: miacollectionActions.INIT_SHOW_ARTWORK, artwork_id}), dispatch),
    propsSubmitPref: bindActionCreators((item_id, pref) => ({type: survey_actions.RECORD_SURVEY_PREF, item_id, pref}), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyContent);

SurveyContent.propTypes = {
  initSurveyData : PropTypes.func, // bound action creator
  loadPanel: PropTypes.func,
  propsSubmitPref: PropTypes.func,
  taggedArtworkEntities: PropTypes.array,
  prefItemEntities: PropTypes.array,
  surveyItems: PropTypes.array,
  surveyItemPrompt: PropTypes.object,
  surveySessionData: PropTypes.object
}