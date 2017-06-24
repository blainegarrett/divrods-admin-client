import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/components/connect';
import PageBase from '../PageBase';
import { asyncConnect } from 'redux-connect';
import { getArticlesByCategorySlug, fetchArticlesByCategorySlug, getCatgoryBySlug, fetchCategoryBySlug } from '../../actions';

import TempExtras from '../../components/TempExtras';
import Pod from '../../modules/articles/components/Pod';
import PageLink from '../../containers/PageLink';


function mapStateToProps(state, ownProps) {
  return {
    posts: getArticlesByCategorySlug(state, ownProps.params.category_slug),
    category_resource: getCatgoryBySlug(state, ownProps.params.category_slug)
  }
}

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const state = getState();
    const promises = [];
    promises.push(dispatch(fetchCategoryBySlug(state, params.category_slug)));
    promises.push(dispatch(fetchArticlesByCategorySlug(state, params.category_slug)));
    return Promise.all(promises)
  }
}])
@connect(mapStateToProps)
class WrittenCategoryPage extends PageBase {
  populate_meta() {
    this.meta.title = this.props.category_resource.title + ' | Written';
    this.meta.description = 'Articles filed under ' + this.props.category_resource.title;
  }

  renderPage() {
    // Render Article List
    let rendered_articles = null;

    if (this.props.posts) {
      rendered_articles = this.props.posts.map(function(resource) {
        return (
          <div className="card hoverable" key={resource.resource_id}>
            <Pod resource={resource} />
          </div>
        );
      });
    }

    // If the category didn't exist bail... but what about if there ARE articles?
    if (!this.props.category_resource) {
      // Ideally throw a 404
      return (
        <div>
          <h2>Could Not Find Page</h2>
          <p>The page you were looking for does not exist. Please return to our <PageLink to="/">homepage.</PageLink></p>
        </div>);
    }


    return (
      <div>
        <h2>{ this.props.category_resource.title }</h2>
        { rendered_articles }
        <TempExtras />
      </div>
    );
  }
}

export default WrittenCategoryPage;
