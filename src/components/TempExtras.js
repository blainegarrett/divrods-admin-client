import React, {Component} from 'react';
import {Row, Col} from '../lib/grid';

export default class TempExtras extends Component {
  render () {
    return (
      <Row>
        <Col xs={12} md={12} id="panel-hashtag">
          <Row className="pink-wrapper">
            <Col xs={12} md={4} className="solid-bg">#mplsart</Col>
            <Col xs={12} md={8} className="solid-white">
                If you are making art or looking at art in the Twin Cities, use the hashtag to show it off.
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}