import React, {Component} from 'react';
import PropTypes from 'prop-types';
import WrittenArticlePage from './WrittenArticlePage';
import WrittenCategoryPage from './WrittenCategoryPage';
import WrittenAuthorPage from './WrittenAuthorPage';
import WrittenMainPage from './WrittenMainPage';
import connect from 'react-redux/lib/components/connect';
import { asyncConnect } from 'redux-connect';
import { fetchUpcomingEvents, getUpcomingEvents, getNowShowingEvents, fetchNowShowingEvents } from '../../actions';
import {TempNowShowing, TempUpcoming} from '../../components/layout/TempEventsPanels';
import {Row, Col} from '../../lib/grid';
import Footer from '../../components/layout/Footer';
import {WRITTEN_EVENTLIST_DESKTOP_1, WRITTEN_EVENTLIST_MOBILE_1} from '../../modules/adverts/adspots';

function mapDispatchToProps(dispatch) {
  return { }
}
function mapStateToProps(state, ownProps) {
  return {
    upcoming_events: getUpcomingEvents(state),
    nowshowing_events: getNowShowingEvents(state),
  }
}

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const state = getState();
    const promises = [];
    promises.push(dispatch(fetchUpcomingEvents(state)));
    promises.push(dispatch(fetchNowShowingEvents(state)));
    return Promise.all(promises)
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
class WrittenPageShell extends Component {
  render() {
    return (
      <div className="WrittenPageShell">
        <Row>
          <Col xs={12} md={6}>
              { this.props.children }
          </Col>
           <Col xs={12} md={3} className="panel-events">
              <TempNowShowing name="OPENINGS & EVENTS" ed_filter="timed" events={this.props.upcoming_events } adspot_id={ WRITTEN_EVENTLIST_MOBILE_1 }  />
          </Col>
           <Col xs={12} md={3} className="panel-events">
              <TempUpcoming name="NOW SHOWING" ed_filter="reoccurring" events={this.props.nowshowing_events } adspot_id={ WRITTEN_EVENTLIST_DESKTOP_1 } />
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

WrittenPageShell.propTypes = {
  upcoming_events: PropTypes.array,
  nowshowing_events: PropTypes.array,
  loadAds: PropTypes.object,
  children: PropTypes.object,
  advert_resource: PropTypes.object
}

export {WrittenPageShell, WrittenArticlePage, WrittenCategoryPage, WrittenMainPage, WrittenAuthorPage};
