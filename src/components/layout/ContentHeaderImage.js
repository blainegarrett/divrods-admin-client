import React from 'react';
import PropTypes from 'prop-types';
import {Row} from '../../lib/grid';

export default function ContentHeaderImage({resource, caption}) {
  let image_url;
  let caption_text;

  // If no image resource, simply return
  if (!(resource && resource.resource_id)) return null;

  // Determine best image version to use
  image_url = resource.versions['CARD_SMALL'].url;

  // If no image url, simply return
  if (!image_url) return null;

  // Determine Caption
  caption_text = 'Post Image'; // Default
  if (caption) { caption_text = caption; }

  return (
    <Row>
      <div className="full-width-image">
        <img src={image_url} alt={caption_text} title={caption_text} className="img-responsive" />
      </div>
    </Row>
  );
}
// prop definitions
ContentHeaderImage.propTypes = {
  resource: PropTypes.object,
  caption: PropTypes.string
};