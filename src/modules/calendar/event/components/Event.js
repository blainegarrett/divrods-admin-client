import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'react-toolbox/lib/menu';
import moment from 'moment-timezone/builds/moment-timezone.min';
import NiceDate from '../../../../components/utils/NiceDate';
import {InlineMap, build_google_map_url_for_venue, MAPSIZES} from '../../../map';
import {Row, Col} from '../../../../lib/grid';
import LyftSlice from '../../../../components/layout/LyftSlice';
import ContentHeaderImage from '../../../../components/layout/ContentHeaderImage';

import EventDateMenu from './EventDateMenu';


function sort_helper(ed1, ed2) {
    return moment(ed1.start) - moment(ed2.start)
}

// TODO: Eventually get to the point where this is a stateless function
export default class Event extends Component {
  // Event Fullview Renderer

  delete_confirmation (e) {
    e.preventDefault();

    if (confirm('Are you sure you want to delete this event?')) {
      //var url = '/api/events/' + this.state.resource.resource_id;
      //type: 'DELETE'

      alert('This doesn\'t work at the moment... Talk to Blaine');
    }
  }
  render () {
    const resource = this.props.resource;
    let eventDates = [];
    let rendered_venue;
    let venue_resource;
    let big_link_button;
    let rendered_more_url;

    // Admin Controls
    let edit_link;
    if (this.props.render_admin_contols) {
      edit_link = (
        <div>
          <a href={'/admin/events/' + resource.resource_id + '/edit'} target="_blank">edit</a>
          -
          <a href="#" onClick={this.delete_confirmation} target="_blank">delete</a>
        </div>
      );
    }


    // Generate Event Date list
    var sorted_event_dates = resource.event_dates.sort(sort_helper, Object.assign([], resource.event_dates));
    eventDates = sorted_event_dates.map(function (ed, i) {

      // Generate Google Calendar URL
      let venue_resource = ed.venue;
      let v_addr = encodeURIComponent(venue_resource.name).replace(/%20/g, '+') + ',+' + encodeURIComponent(venue_resource.address).replace(/%20/g, '+') + ',+' + encodeURIComponent(venue_resource.city).replace(/%20/g, '+') + ',+MN';

      let g_url = 'https://www.google.com/calendar/render?action=TEMPLATE&text=';
      g_url += encodeURIComponent(resource.name + ' (' + ed.label + ')').replace(/%20/g, '+');
      g_url += '&ctz=America/Chicago&dates=';
      g_url += moment(Date.parse(ed.start)).utc().format('YYYYMMDDTHHmm') + '00Z/';
      g_url += moment(Date.parse(ed.end)).utc().format('YYYYMMDDTHHmm') + '00Z';
      g_url += '&details=' + encodeURIComponent(resource.summary).replace(/%20/g, '+') + ' \n\nFor more info visit: http://mplsart.com/events/' + resource.slug
      g_url += '&location=' + v_addr;
      g_url += '&sf=true&output=xml#eventpage_6';

      //console.log(g_url);

      let nice_date = <NiceDate start={ ed.start } end={ ed.end } eventdate_type={ ed.type } />

      return (
        <div key={ 'event_date-' + i } className="event-date">
          <dt className="event-label">{ ed.label } </dt>
            <dd>
              <span style={ {display: 'inline-block', padding:'12px 0', verticalAlign: 'middle'} }>{ nice_date }</span>
              <EventDateMenu>
                <MenuItem value="google-calendar-add" icon="event"><a href={ g_url}>Add To Google Calendar</a></MenuItem>
              </EventDateMenu>
            </dd>
        </div>
      );
    });


    // Primary Venue
    venue_resource = resource.event_dates[0].venue;
    const map_url = build_google_map_url_for_venue(venue_resource);

    if (venue_resource.multiple_locations_label) {
      rendered_venue = (
        <div>
          <b>Various Locations</b><br />
          <span>{venue_resource.multiple_locations_label }</span> <span>( <a href={ map_url } target="_new">map</a> )</span>
        </div>
      );
    } else {
      rendered_venue = (
        <div>
          <b>{venue_resource.name }</b><br />
          <span>{venue_resource.address} </span>
          <span>{venue_resource.address2}</span><br />
          <span>{venue_resource.city }</span> <span>( <a href={ map_url } target="_new">map</a> )</span>
        </div>
      );
    }

    // Event more info button/link
    if (resource.url) {
      // Rendered version for non-mobile version
      // TODO: Add analytic
      rendered_more_url = (
        <span className="small">
          <br />
          <a href={ resource.url } target="_new" title="More information on the event's website">Event Website </a>
        </span>
      );

      // Rendered version for small screends
      big_link_button = (<a href={ resource.url } target="_new" className="btn btn-primary btn-lg btn-block"> More Information <span className="fa fa-external-link"></span></a>);
    }

    return (
      <div>
        <ContentHeaderImage resource={resource.primary_image_resource} caption={resource.name} />
        { edit_link }

        <div className="padded-content">
          <h2>{ resource.name }</h2>
          <p className="lead">
            { resource.summary }
            { rendered_more_url }
          </p>

          <Row>
            <br />
            <Col xs={12} md={6}>
              <dl>{ eventDates }</dl>
            </Col>

            <Col xs={12} md={6}>
              { rendered_venue }
              <br />
            </Col>
          </Row>
        </div>

        <div className="hide-on-med-and-down">
          <InlineMap size={MAPSIZES.SMALL} gallery={venue_resource} />
        </div>

        <LyftSlice />

        <br />

        <div className="padded-content">
          <div className="content" dangerouslySetInnerHTML={{__html: resource.content}} />
        </div>

        <br />
        <div className="hide-on-large-only">{ big_link_button }</div>
        <br />
      </div>
    );
  }
}


Event.propTypes = {
  // Injected by React Redux
  render_admin_contols: PropTypes.bool,
  resource: PropTypes.object
}