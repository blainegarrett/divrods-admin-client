import React from 'react';
import PageBase from '../PageBase';

import connect from 'react-redux/lib/components/connect';
import { asyncConnect } from 'redux-connect';
import { getEventBySlug, fetchEventBySlug, getAuth } from '../../actions';
import EventRenderer from '../../modules/calendar/event/components/Event';
import EventModule from '../../modules/calendar/event';
import NotFoundPage from './NotFoundPage';
import { PAGE_TYPES} from '../../constants';

import TempExtras from '../../components/TempExtras';
import Separator from '../../components/layout/Separator';


function mapStateToProps(state, ownProps) {
  return {
    resource: getEventBySlug(state, ownProps.params.slug),
    auth: getAuth(state)
  }
}
@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {

    const promises = [];
    promises.push(dispatch(fetchEventBySlug(getState(), params.slug)));
    return Promise.all(promises)
  }
}])
@connect(mapStateToProps)
export default class CalendarEventPage extends PageBase {
  populate_meta() {
    const props = this.props;

    // Set Meta
    this.meta.title = props.resource.name;
    this.meta.description = props.resource.summary;
    this.meta.type = PAGE_TYPES.EVENT;

    if (props.resource.primary_image_resource && props.resource.primary_image_resource.versions.CARD_SMALL.url) {
      this.meta.image = props.resource.primary_image_resource.versions.CARD_SMALL.url;
      this.meta.imageWidth = props.resource.primary_image_resource.versions.CARD_SMALL.width;
      this.meta.imageHeight = props.resource.primary_image_resource.versions.CARD_SMALL.height;
    }
  }
  renderPage() {
    if (!this.props.resource) {
      return (<NotFoundPage />);
    }

    return (
      <div>
        <EventModule.Goober resource={this.props.resource} renderer={EventRenderer} render_admin_contols={this.props.auth.is_gae_admin} />
        <Separator className="with-margin" />
        <TempExtras />
      </div>
    );
  }
}
