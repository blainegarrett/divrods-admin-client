import React from 'react';
import PageBase from '../PageBase';
import Grid from './Grid';
import { loadPreferences, PreferencesManager } from '../../modules/preferences/redux/managers';
import connect from 'react-redux/lib/components/connect';
import { asyncConnect } from 'redux-connect';
import { LoadMoreButton } from '../../ui/LoadMoreButton';

function mapStateToProps(state, ownProps) {
  // TODO: ATM, we the queryparams must match loadPreferences
  const manager = new PreferencesManager({limit:100});

  return {
    manager: manager,
    pageCollection: manager.getPageCollection(state),
    loadPreferences
  }
}
@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];
    promises.push(dispatch(loadPreferences()));
    return Promise.all(promises)
  }
}])
@connect(mapStateToProps, {loadPreferences})
export default class PreferencesListViewPage extends PageBase {
    populate_meta() {

      this.meta.title = 'Preference Data';
      this.meta.description = 'Divining Rods Preference Data';
  }

  constructor(props) {
      // TODO: This might bork out the page's constructor
    super(props);
    /* Bind the handlers that will trigger actions */
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentWillMount() {
    /* this.props.loadPreferences() */
  }

  handleLoadMore() {
    this.props.loadPreferences(this.props.pageCollection.getNextCursor());
  }

  renderPage() {
    // Render Preference List
    let resources = this.props.pageCollection.getResources();
    return (
      <div>
        <h2>Preferences</h2>
        <div id="PreferencesListViewPage">
          <Grid spork={resources} />
        </div>

        <LoadMoreButton hasMore={this.props.pageCollection.hasMore()} loadMoreClickHandler={this.handleLoadMore} displayLabel="More More"/>
      </div>
    );
  }
}


/*
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
export default class PreferencesListViewPage extends PageBase {

  populate_meta() {
    this.meta.title = 'Preference Data';
    this.meta.description = 'Divining Rod Preference Data';
  }

  renderPage() {
    return (
      <div id="PreferencesListViewPage">
        <Grid spork={this.props.posts} />
      </div>
    );
  }
}
*/