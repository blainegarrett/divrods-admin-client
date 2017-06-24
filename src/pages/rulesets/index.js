import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/components/connect';
import { asyncConnect } from 'redux-connect';
import {Row, Col} from '../../lib/grid';
import Footer from '../../components/layout/Footer';
import PageBase from '../PageBase';
import RuleSetGrid from './RuleSetGrid';
import RuleGrid from './RuleGrid';
import { LoadMoreButton } from '../../ui/LoadMoreButton';
import { loadRulesets, RulesetsManager } from '../../modules/rulesets/redux/managers';
import { loadRules, RulesManager } from '../../modules/rulesets/redux/managers';
import { loginRequired } from '../../xauth/decorators';

@loginRequired('admin')
class RulesetsPageShell extends Component {
  render() {
    return (
      <div className="RuleSetsPageShell">
        <Row>
          <Col xs={12} md={12}>
              { this.props.children }
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

RulesetsPageShell.propTypes = {
  children: PropTypes.object,
}

// Ruleset Manager Page

function mapStateToProps(state, ownProps) {
  const manager = new RulesetsManager({limit:100});

  return {
    manager: manager,
    pageCollection: manager.getPageCollection(state),
    loadRulesets
  }
}

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];

    promises.push(dispatch(loadRulesets()));
    return Promise.all(promises)
  }
}])
@connect(mapStateToProps)
class RulesetsListViewPage extends PageBase {
  populate_meta() {

      this.meta.title = 'Ruleset Data';
      this.meta.description = 'Divining Rods Ruleset Data';
  }

  constructor(props) {
      // TODO: This might bork out the page's constructor
    super(props);
    /* Bind the handlers that will trigger actions */
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  handleLoadMore() {
    this.props.loadRulesets(this.props.pageCollection.getNextCursor());
  }

  renderPage() {
    // Render Preference List
    let resources = this.props.pageCollection.getResources();

    return (
      <div>
        <RuleSetGrid spork={resources} />
        <LoadMoreButton hasMore={this.props.pageCollection.hasMore()} loadMoreClickHandler={this.handleLoadMore} displayLabel="More More"/>
      </div>
    );
  }
}


// Rules Manager Page
function mapStateToProps2(state, ownProps) {
  const manager = new RulesManager({ruleset_id: ownProps.params.ruleset_id, limit:100});
  return {
    manager: manager,
    pageCollection: manager.getPageCollection(state),
    loadRules
  }
}

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];
    promises.push(dispatch(loadRules(params.ruleset_id)))
    return Promise.all(promises)
  }
}])
@connect(mapStateToProps2, {loadRules})
class RulesListView extends PageBase {
  populate_meta() {

      this.meta.title = 'Rules Data';
      this.meta.description = 'Divining Rods Rules Data';
  }

  constructor(props) {
      // TODO: This might bork out the page's constructor
    super(props);
    /* Bind the handlers that will trigger actions */
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  handleLoadMore() {
    this.props.loadRules(this.props.params.ruleset_id, this.props.pageCollection.getNextCursor());
  }

  renderPage() {
    // Render Rules List
    let resources = this.props.pageCollection.getResources();
    return (
      <div>
        <RuleGrid spork={resources} />
        <LoadMoreButton hasMore={this.props.pageCollection.hasMore()} loadMoreClickHandler={this.handleLoadMore} displayLabel="More More"/>
      </div>
    );
  }
}

export {RulesetsPageShell, RulesetsListViewPage, RulesListView};