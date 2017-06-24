import React from 'react';
import connect from 'react-redux/lib/components/connect';
import PageBase from '../PageBase';
import { asyncConnect } from 'redux-connect';
import { getArticles, fetchArticles } from '../../actions';
import Pod from '../../modules/articles/components/Pod';
import TempExtras from '../../components/TempExtras';
import Separator from '../../components/layout/Separator';

function mapStateToProps(state, ownProps) {
  return {posts: getArticles(state)}
}

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];

    promises.push(dispatch(fetchArticles(getState())))
    return Promise.all(promises)
  }
}])
@connect(mapStateToProps)
export default class WrittenMainPage extends PageBase {
    populate_meta() {

      this.meta.title = 'Written';
      this.meta.description = 'Commentary, Interviews, and Critique';
  }

  renderPage() {

    // Render Article List
    let rendered_articles = null
    if (this.props.posts) {
        rendered_articles = this.props.posts.map(function(resource) {
            return (
              <div className="card hoverable" key={resource.resource_id}>
                <Pod resource={resource} />
              </div>
            );
        });
    }

    return (
      <div>
        <h2>Written</h2>
        { rendered_articles }

        <Separator className="with-margin" />
        <TempExtras />
      </div>
    );
  }
}
