import React, { Component } from 'react';
import { loginRequired } from '../../../xauth/decorators';
import TaggedArtContent from './TaggedArtContent';

class TaggedArtIndexPage extends Component {
    render() {
        return (
            <div>
                <h2>Tagged Artwork</h2>
                <TaggedArtContent />
            </div>
        );
    }
}
export default loginRequired('admin')(TaggedArtIndexPage);

TaggedArtIndexPage.propTypes = { }