import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EventModule from '../../modules/calendar/event';
import WrittenModule from '../../modules/articles';
//var AdvertModule = require('./../DataTypes/Advert');
import Separator from './Separator';
import styles from './FeaturedHeroPanel.css';
import {Row, Col} from '../../lib/grid';

var podComponentMap = {
  'Event': EventModule,
  'BlogPost': WrittenModule
  //'Advert': AdvertModule
};

export default class FeaturedHeroPanel extends Component {
  render () {

    let rendered_marquee_events;
    let rendered_big_card;

    let resources = Object.assign([], this.props.resources);

    if (resources.length == 0) { // All resources including "bigcard"
        // Not loaded yet and/or error...
        return null;
        //return <Row id="featured-hero-area">xxx</Row>
    }

    // Big Featured Card
    let big_card_spot_resource = resources.pop();
    let componentClass = podComponentMap[big_card_spot_resource.resource_type];
    if (!componentClass) {
      // TODO: Revisit This...
      return (<Col xs={12}><div className="card"></div></Col>);
    }

    let pod_props = {key: 'hero-event-big',  'resource': big_card_spot_resource, renderer: componentClass.FeaturedHeroRenderer };
    rendered_big_card = React.createElement(componentClass.Goober, pod_props);


    // The other cards
    const total_cards = resources.length; // Non "bigcard" count
    rendered_marquee_events = resources.map(function (resource, i) {
      let classNames = [];
      let colspan = 6; // default colspan

      // If there are fewer than 2 total cards
      if (total_cards < 2) {
        colspan = 12;
      }

      if (total_cards <= 2) {
        classNames.push('solo-card-poorly-named'); //basically sets full height card
      }

      // Dynamically Render based on Resource Type
      let componentClass = podComponentMap[resource.resource_type];
      if (!componentClass) {
        // TODO: Revisit This...
        return (<Col xs={12} md={colspan} key={ 'hero-event-' + i } className={ classNames.join(' ') }><div className="card"></div></Col>);
      }

      let pod_props = {'resource': resource, renderer: componentClass.FeaturedHeroRenderer };
      let rendered_card = React.createElement(componentClass.Goober, pod_props);

      return (
        <Col xs={12} md={colspan} key={ 'hero-event-' + i } className={ classNames.join(' ') }>
          <div className="card hoverable">
            { rendered_card }
          </div>
        </Col>
      );
    }); // end map()

    return (
      <div>
        <Row id="featured-hero-area" className={styles.base}>
          <Col xs={12} md={6}>
            <Row className="featured-events-wrapper">
              { rendered_marquee_events }
            </Row>
          </Col>

          <Col xs={12} md={6} className="featured-events-wrapper">
            <div className="card large-card hoverable">
              { rendered_big_card }
            </div>
          </Col>
        </Row>

        <Separator />
      </div>
    );
  }
}

FeaturedHeroPanel.propTypes = {
  resources: PropTypes.array.isRequired
}