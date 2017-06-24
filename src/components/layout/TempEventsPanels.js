import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EventModule from '../../modules/calendar/event';
import AdvertModule from '../../modules/adverts';
import {Row, Col} from '../../lib/grid';

class TempEventList extends Component {
  render() {
    const ed_filter = this.props.ed_filter;
    const eventNodes = this.props.events.map(function (event, i) {
      return (
        <Col xs={12} key={ event.resource_id + '_' + i }>
          <div className="card hoverable">
            <EventModule.Goober resource={ event } ed_filter={ ed_filter } renderer={ EventModule.PodRenderer } />
          </div>
        </Col>
      );
    });

    // Show advertisement
    let advert;
    if (this.props.adspot_id) {
      advert = (<AdvertModule.AdSpotLoader adspot_id={this.props.adspot_id}/>);
    }

    return (
      <div className="panel-container">
        { advert }
        <div className="panel-header">{ this.props.name }</div>
        <div className="panel-content">
          <Row>{ eventNodes }</Row>
        </div>
      </div>
    );
  }
}

TempEventList.propTypes = {
  ed_filter: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  advert_resource: PropTypes.object
}

export class TempUpcoming extends Component {
  render() {
    return (<TempEventList {...this.props} />);
  }
}

export class TempNowShowing extends Component {
  render() {
    return (<TempEventList {...this.props} />);
  }
}