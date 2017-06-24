import React from 'react';
import connect from 'react-redux/lib/components/connect';
import PageBase from '../PageBase';
import { asyncConnect } from 'redux-connect';
import { getArticlesByAuthorResource, fetchArticlesByAuthorResource } from '../../actions';
import { getAuthorResource, fetchAuthorResource } from '../../actions';
import TempExtras from '../../components/TempExtras';
import Pod from '../../modules/articles/components/Pod';
import AuthorSlice from '../../modules/articles/components/AuthorSlice';
import PageLink from '../../containers/PageLink';


function mapStateToProps(state, ownProps) {
  return {
    author_resource: getAuthorResource(state, ownProps.params.author_resource),
    posts: getArticlesByAuthorResource(state, ownProps.params.author_resource)
  }
}

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];
    let state = getState();
    promises.push(dispatch(fetchArticlesByAuthorResource(state, params.author_resource)))
    promises.push(dispatch(fetchAuthorResource(state, params.author_resource)))
    return Promise.all(promises)
  }
}])
@connect(mapStateToProps)
export default class WrittenAuthorPage extends PageBase {
  populate_meta() {

    // TODO: Update this one we have the author resource...?
    this.meta.title = 'Written';
    this.meta.description = 'Commentary, Interviews, and Critique';
  }

  renderPage() {
    // Render Article List
    let rendered_articles;

    if (this.props.posts) {
      rendered_articles = this.props.posts.map(function(resource) {
        return (
          <div className="card hoverable" key={resource.resource_id}>
            <Pod resource={resource} />
          </div>
        );
      });
    }

    // If the author didn't exist bail... but what about if there ARE articles?
    if (!this.props.author_resource) {
      // Ideally throw a 404
      return (
        <div>
          <h2>Could not find author</h2>
          <p>The author you were looking for could not be found. Please return to our <PageLink to="/">homepage.</PageLink></p>
        </div>);
    }

    return (
      <div>
        <h2>Written by { this.props.author_resource.firstname } { this.props.author_resource.lastname }</h2>
        {/* <AuthorSlice resource={this.props.author_resource} /> */}
        { rendered_articles }
        <TempExtras />
      </div>
    );
  }
}
