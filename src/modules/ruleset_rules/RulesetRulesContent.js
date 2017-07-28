import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { action, LOAD_RULES_PAGE } from '../../redux/actions';
import Button from 'react-toolbox/lib/button/Button';
import Grid from './Grid';

class RulesetsRulesContent extends Component {
  componentWillMount() {
    this.props.loadRulesetData(null, this.props.ruleset_id);
  }
  render() {
    let next_cursor = this.props.next_cursor;
    let more = this.props.more;
    let ruleset_id = this.props.ruleset_id;

    return (
      <div>
        <Grid entities={this.props.entities} />
        { more && (<div style={{textAlign:'center', paddingTop:'20px'}}><Button onClick={() => this.props.loadRulesetData(next_cursor, ruleset_id) } primary raised>Load More</Button></div>) }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { pagination: { ruleset_rules }, } = state;

  let entities = [];
  let more = false;
  let next_cursor = undefined;

  const paginator = ruleset_rules[ownProps.ruleset_id];
  if (paginator) {
    more = paginator.more;
    entities = paginator.ids;
    next_cursor = paginator.cursor;
  }

  return {entities, more, next_cursor};
}

function mapDispatchToProps(dispatch) {
  return {
    loadRulesetData: bindActionCreators((next_cursor, ruleset_id) => action(LOAD_RULES_PAGE, {next_cursor: next_cursor, ruleset_id:ruleset_id}), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RulesetsRulesContent);

RulesetsRulesContent.propTypes = { }