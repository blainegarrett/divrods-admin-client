// Simple React Component to render a human readable date range
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone/builds/moment-timezone.min';
import {get_runtime_constants, CENTRAL_TIMEZONE} from '../../constants';

export default class NiceDate extends Component {
  render() {

    const start = moment(Date.parse(this.props.start)).tz(CENTRAL_TIMEZONE);
    const end = moment(Date.parse(this.props.end)).tz(CENTRAL_TIMEZONE);

    // Default rendering: Nov 8th - Dec 10th
    let display_str = start.format('MMM Do') + ' - ' +  end.format('MMM Do');

    const duration_hours = end.diff(start, 'hours');

    // If the start and end are within 15 hours (arbitrary) this is 1 long day
    // TODO: this.state.eventdate_type == 'timed' might be a better indicator
    if (duration_hours < 15) {
      // Assumed to be a single timed event: Sat Nov 8th 7PM - 10:30PM

      let start_time_format = 'hA';
      let end_time_format = 'hA';

      if (start.minutes() > 0) {
          start_time_format = 'h:mmA';
      }

      if (end.minutes() > 0) {
          end_time_format = 'h:mmA';
      }

      display_str = start.format('ddd MMM Do ' + start_time_format);
      display_str += ' - ';
      display_str += end.format(end_time_format);

      // TODO: This breaks react reuse when browser is not in CST
      if (!get_runtime_constants().is_user_central_timezone) {
        display_str += ' CST';
      }
  }

    return <span>{ display_str }</span>;
  }
}

NiceDate.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired
}