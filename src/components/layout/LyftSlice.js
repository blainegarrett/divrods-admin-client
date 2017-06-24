import React from 'react';
import {Row, Col} from '../../lib/grid';
import ExternalLink from '../../containers/ExternalLink';

export default function LyftSlice() {

  return (
    <div>
      <Col xs={12} md={12} id="lyft-slice">
        <Row>
          <Col xs={2} md={3}>
            <ExternalLink data-ga-category="advert" data-ga-action="click" data-ga-label="lyft-event-slice" title="Get a free ride to this event!" href="https://www.lyft.com/invite/MPLSART" target="_new">
              <img src="//storage.googleapis.com/cdn.mplsart.com/adverts/temp/logo_tiny_pink.png" />
            </ExternalLink>
          </Col>
          <Col xs={10} md={9}>
            <div>Need a ride? New Lyft customers use promo code "mplsart" and
              <ExternalLink data-ga-category="advert" data-ga-action="click" data-ga-label="lyft-event-slice" title="Get a free ride to this event!" href="https://www.lyft.com/invite/MPLSART" target="_new"> get $15 in ride credit free</ExternalLink>.
            </div>
          </Col>
        </Row>
      </Col>
    </div>
  );
}