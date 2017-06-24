import React from 'react';
import PageBase from '../PageBase';

import { PAGE_TYPES} from '../../constants';

export default class NotFoundPage extends PageBase {
  populate_meta() {
    // Set Meta
    this.meta.title = 'Event Not Found';
    this.meta.description = 'The event you were looking for could not be found';
    this.meta.type = PAGE_TYPES.EVENT;
  }

  renderPage() {
    return (
      <div>
        <h2>Event Not Found</h2>
        <p>The event you were looking for could not be found</p>
      </div>
    );
  }
}