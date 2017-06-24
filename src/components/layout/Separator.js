import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from '../../lib/grid';

export default function Separator({className}) {
  let classes = ['fancy-separator'];
  if (className) {
    classes.push(className);
  }
  return (
    <Row>
      <Col xs={12}>
        <div className={ classes.join(' ') }></div>
      </Col>
    </Row>
  );
}
// prop definitions
Separator.propTypes = {
  className: PropTypes.string,
};