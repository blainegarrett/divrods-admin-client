import React from 'react';
import PageBase from './../PageBase';
import {Row, Col} from '../../lib/grid';
import connect from 'react-redux/lib/components/connect';
import {loginRequired} from '../../auth/decorators';

function mapStateToProps(state) { return { layout: state.layout }; }

@loginRequired('admin')
@connect(mapStateToProps)
export default class AuthSecureDemoPage extends PageBase {
  populate_meta() {
    this.meta.title = 'Sign In'
    this.meta.description = 'The best visual art events in Minneapolis and St. Paul'
  }

  constructor(props) {
    super(props);
  }

  renderPage() {
    return (
      <div id="AuthSignInPageWrapper">
        <Row>
          <Col xs={12}>
              <h2>Super Secure Page...</h2>
              <p>This is a super secure page... (Menu Open: {this.props.layout.menu_open.toString() } )</p>
          </Col>
        </Row>
      </div>
    );
  }
}