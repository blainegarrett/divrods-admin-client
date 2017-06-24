import React from 'react';
import {Button} from 'react-toolbox/lib/button';

export const LoadMoreButton = ({hasMore, loadMoreClickHandler,displayLabel}) => (
  <center>
    { hasMore &&
        <div>
            <Button onClick={loadMoreClickHandler} raised primary>{displayLabel}</Button>
            <br /><br />
        </div>
    }
  </center>
);
