import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/components/connect';
import PageBase from '../PageBase';
import { asyncConnect } from 'redux-connect';
import { getArticleBySlug, fetchArticleBySlug, getAuth, fetchAuth } from '../../actions';

import { PAGE_TYPES} from '../../constants';

import TempExtras from '../../components/TempExtras';
import Separator from '../../components/layout/Separator';

import ArticleRenderer from '../../modules/articles/components/Article';
import NotFoundPage from './NotFoundPage';

function mapStateToProps(state, ownProps) {
  return {
    post: getArticleBySlug(state, ownProps.params.slug),
    auth: getAuth(state)
  }
}

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {

    const promises = [];
    promises.push(dispatch(fetchArticleBySlug(getState(), params.slug)))
    return Promise.all(promises)
  }
}])
@connect(mapStateToProps)
export default class WrittenArticlePage extends PageBase {
  populate_meta() {
    const props = this.props;

    // Set Meta
    this.meta.title = props.post.title;
    this.meta.description = props.post.summary;
    this.meta.type = PAGE_TYPES.ARTICLE;
    if (props.post.author_resource) {
      this.meta.author = props.post.author_resource.firstname + " " + props.post.author_resource.lastname;
    }

    if (props.post.primary_image_resource && props.post.primary_image_resource.versions.CARD_SMALL.url) {
      this.meta.image = props.post.primary_image_resource.versions.CARD_SMALL.url;
      this.meta.imageWidth = props.post.primary_image_resource.versions.CARD_SMALL.width;
      this.meta.imageHeight = props.post.primary_image_resource.versions.CARD_SMALL.height;
    }
  }

  renderPage() {

    if (!this.props.post) {
      return (<NotFoundPage />)
    }

    return (
      <div>
        <ArticleRenderer resource={this.props.post} render_admin_contols={this.props.auth.is_gae_admin}/>
          <Separator className="with-margin"/>
          <TempExtras />
      </div>
    );
  }
}