/* General Waterfall component - however currently only in use for the homepage */
//import styles from './WaterFallContainer.scss';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

import EventModule from '../../modules/calendar/event';
import AdvertModule from '../../modules/adverts';
import {Col} from '../../lib/grid';

var podComponentMap = {
  'Event': EventModule,
  'Advert': AdvertModule
};

var masonryOptions = {
  transitionDuration: 0,
  gutter: 0,
  stagger: 30,
  columnWidth: '.spacer',
  itemSelector: '.waterfall-pod'
};

class Pod extends Component {
  render() {
    let colspan = 3;
    let pod_content;
    let pod_props;

    if (this.props.resource.featured) {
      colspan = 6;
    }
    var componentClass = podComponentMap[this.props.resource['resource_type']];
    if (!componentClass) {
      return (<Col xs={12} sm={3} className="waterfall-pod"><div className="card"></div></Col>);
    }


    if (this.props.resource['resource_type'] == 'Advert') { // Somewhat hacky...
      pod_content = (<AdvertModule.AdSpotLoader adspot_id={this.props.resource['adspot_id'] }/>);
    }
    else {
      pod_props = {'resource': this.props.resource, renderer: componentClass.PodRenderer };
      pod_content = React.createElement(componentClass.Goober, pod_props);
    }

    return (
      <Col xs={12} sm={colspan} className="waterfall-pod">
        <div className="card hoverable">
          { pod_content }
        </div>
      </Col>
    );
  }
}

Pod.propTypes = {
  resource: PropTypes.object.isRequired
}

export default class WaterFallContainer extends Component {
  componentWillReceiveProps() {
    if (this.masonry) {
      this.masonry.reloadItems();
    }
    // else, component not mounted yet
  }

  render () {
    let pods = [];
    pods = this.props.resources.map(function (pod_data, i) {
      return <Pod key={'pod-' + i} resource={pod_data} />;
    });
    //return (<div className="waterfall-container" style={{'width': '100%'}}>{ pods }</div>);
    return (
      <div className="waterfall-container" style={{'width': '100%'}} ref="masonryContainer">
        <Masonry
          ref={function(c) { if (c) { this.masonry = c.masonry} }.bind(this)}
          className={''} // default ''
          elementType={'div'} // default 'div'
          options={masonryOptions} // default {}
          disableImagesLoaded={true} // default false
        >
          { pods }
          <Col xs={12} sm={1} className="spacer">
            <div className="card"></div>
          </Col>
        </Masonry>
      </div>
    );
  }
}
WaterFallContainer.propTypes = {
  resources: PropTypes.array.isRequired
}