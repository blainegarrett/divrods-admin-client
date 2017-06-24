import React from 'react';
import PageBase from '../PageBase';

import { PAGE_TYPES} from '../../constants';

export default class NotFoundPage extends PageBase {
  populate_meta() {
    // Set Meta

    this.meta.title = 'Article Not Found';
    this.meta.description = 'The article you were looking for could not be found';
    this.meta.type = PAGE_TYPES.Article;
  }

  renderPage() {
    return (
      <div>
        <h2>Article Not Found</h2>
        <p>The article you were looking for could not be found</p>
      </div>
    );
  }
}