import React from 'react';
import PageBase from './../PageBase';
import {Row, Col} from '../../lib/grid';
import connect from 'react-redux/lib/components/connect';
import { requestInvite, initAcceptInviteWorkflow } from '../../auth/actions/invite';
import { bindActionCreators } from 'redux';
import {AUTH_TYPES} from '../../auth/constants';

function mapDispatchToProps(dispatch) {
  return {
    requestInvite: bindActionCreators(requestInvite, dispatch),
    acceptInvite: bindActionCreators(initAcceptInviteWorkflow, dispatch),
    dispatch: dispatch
  };
}
function mapStateToProps(state) {
  return { invite: state.authInviteAcceptStore};
}
@connect(mapStateToProps, mapDispatchToProps)
export default class AuthInvitePage extends PageBase {
  populate_meta() {
    this.meta.title = 'Sign In'
    this.meta.description = 'The best visual art events in Minneapolis and St. Paul'
  }

  constructor(props) {
    super(props);
    this.maybeSignIn = this.maybeSignIn.bind(this);
  }

  componentDidMount () {
    this.props.requestInvite(this.props.params.invite_resource_id, this.props.params.token);
  }

  maybeSignIn(e) {
    console.log(this.props.params.invite_resource_id, this.props.params.token);

    const auth_type = e.target.getAttribute('data-auth-type');
    this.props.acceptInvite(auth_type, this.props.params.invite_resource_id, this.props.params.token, this.props.dispatch);
    console.log(auth_type);
  }

  renderPage() {
    console.log(this.props.invite);

    let content;
    if (this.props.invite && this.props.invite.loading) {
      content = (<div>Loading...</div>)
    }
    else if (this.props.invite && this.props.invite.failure) {
      content = (<div>Unable to validate invite.</div>)
    }
    else if (this.props.invite && this.props.invite.resource) {
      // Successfully retrieved the invite

      content =
      (<div>
          <h2>Answer the Call</h2>
          <p>You have been invited to become a MPLSART.COM contributor.</p>

          <p>After clicking <em>Accept Invitiation</em> below, you will be required to log in with Google to verify your identity.</p>


          <p>
          <br />
            <a href="#" onClick={ this.maybeSignIn } data-auth-type={ AUTH_TYPES.GOOGLE } title="Accept Invite" className="btn btn-social btn-lg btn-google-plus">
              <i className="fa fa-check"></i> Accept Invite
            </a>
          </p>


      </div>);
    }

    return (
      <div id="AuthSignInPageWrapper">
        <Row>
          <Col xs={12}>


              { content }
          </Col>
        </Row>
      </div>
    );
  }
}