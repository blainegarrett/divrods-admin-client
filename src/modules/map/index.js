import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExternalLink from '../../containers/ExternalLink';
import classnames from 'classnames';


export const MAPSIZES = {SMALL: 'sm', LARGE: 'lg'};

export function build_google_map_url_for_venue(venue) {
  // Construct A url to link this venue to google maps.
  // TODO: It'd be great to take in some sort of Address Object

  //let lat = venue.geo[0].lat;
  //let lon = venue.geo[0].lon;
  let address = '+' + encodeURIComponent(venue.address).replace(/%20/g, '+') + ',+' + encodeURIComponent(venue.city).replace(/%20/g, '+') + ',+MN';
  let venue_name = encodeURIComponent(venue.name).replace(/%20/g, '+');

  //let map_url = 'https://www.google.com/maps/place/' + venue_name + ',' + address + '/@' + lat + ',' + lon + ',17z/';
  let map_url = 'https://www.google.com/maps/?q=' + venue_name + ',' + address; // + '/@' + lat + ',' + lon + ',17z/';
  return map_url
}

export class InlineMap extends Component {
  static propTypes = {
    overlay: PropTypes.bool,
    size: PropTypes.oneOf([MAPSIZES.SMALL, MAPSIZES.LARGE]),
    zoom: PropTypes.number
  }

  static defaultProps = {
    overlay: true,
    size: MAPSIZES.LARGE,
    zoom: 15
  }

  setupMap () {
    const  c = this;

    // We only want to render this on the client
    if (!global.__CLIENT__) { return; }

    // TODO: Import key fro constants...
    global.GoogleMapsLoader.load(function(google) {
      let map_center
      let is_polygon
      let polygon;

      var geo_data = c.props.gallery.geo; //TODO: immutable copy

      // Instanciate map with defaults
      // TODO: Pass in the component or id of the canvas container
      const map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: { lat: 0, lng: 0},
        zoom: c.props.zoom,
        scrollwheel: false
      });

      // Determine if this.state.geo is a point or polygon (list of points)
      is_polygon = false;
      if (typeof(geo_data.push) == 'function') { //it's an array
        if (geo_data.length > 1) {
          is_polygon = true;
        }
        else {
          geo_data = geo_data[0]
        }
      }

      if (is_polygon) {
        // Create verticies for each bit of the polygon
        const polygon_verticies = geo_data.map(function(pt) {
          return new google.maps.LatLng(pt.lat, pt.lon);
        });

        polygon = createPolygon(polygon_verticies); // Create polygon
        polygon.setMap(map); // Attach Polygon to Map

        // Center the Map based on the geometric center of the poly
        map_center = polygon.getBounds().getCenter();
        map.fitBounds(polygon.getBounds()); // Zoom to ensure that the bounds

      }
      else {
        // Switching to marker mode
        let marker = new google.maps.Marker({
          position: { lat: geo_data.lat, lng: geo_data.lon},
          map: map,
          title: c.props.gallery.name
        });

        // Set center of map to the marker
        map_center = new google.maps.LatLng(geo_data.lat, geo_data.lon);
      }

      // Center Map
      map.setCenter(map_center);
    });
  }

  componentDidMount() { this.setupMap(); }
  componentDidUpdate() { this.setupMap(); }

  render() {

    var map_classNames = ['map-component'];
    map_classNames.push('map-inline');

    // Determine mapsizes
    if (this.props.size == MAPSIZES.LARGE) {
      map_classNames.push('map-large');
    }
    else if (this.props.size == MAPSIZES.SMALL) {
      map_classNames.push('map-small');
    }

    // Manage the map overlay
    if (this.props.overlay) {
      map_classNames.push('map-overlay');
    }

    let overlayNodes;

    if (this.props.overlay) {
      overlayNodes = (
        <div>
          <div className="map-overlay-background">&nbsp;</div>
          <div className="map-overlay-controls-container single-overlap-action">
            <ExternalLink href={ build_google_map_url_for_venue(this.props.gallery) }
              target="_new"
              data-ga-category="map-interaction"
              data-ga-action="click"
              data-ga-label="open-external"
            >
              <div className="btn-group">Open Map <span className="fa fa-external-link"></span> </div>
            </ExternalLink>
          </div>
        </div>
      );
    }

    return (
      <div className={classnames(map_classNames)}>
        <div className="map-canvas-container">
          <div id="map-canvas" className="map-canvas"></div>
        </div>
        {overlayNodes}
      </div>
    );
  }
}


/* Map Helper Methods and Callbacks */

function createPolygon(coords) {
  var polygon = new google.maps.Polygon({
    paths: coords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#fff000',
    fillOpacity: 0.35,
    editable: false,
    draggable: false
  });

  // Attach the getBounds method since this is left of polys for Map API v3
  polygon.getBounds = function () {
    // http://stackoverflow.com/a/3082334
    var bounds = new google.maps.LatLngBounds();
    var vertices = this.getPath();

    // Iterate over the vertices.
    for (var i = 0; i < vertices.getLength(); i++) {
      bounds.extend(vertices.getAt(i));
    }
    return bounds;
  }
  return polygon;
}
