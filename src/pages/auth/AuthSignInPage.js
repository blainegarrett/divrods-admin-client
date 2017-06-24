import React from 'react';
import PageBase from './../PageBase';
import {Row, Col} from '../../lib/grid';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/components/connect';
import { signIn } from '../../auth/actions/auth_state';
import {AUTH_TYPES} from '../../auth/constants';


// Given the global state, update our props with state bits we care ab
function mapStateToProps(state) {
  return { authFlowState: state.authFlowStore };
}

function mapDispatchToProps(dispatch) {
  return { signIn: bindActionCreators(signIn, dispatch) };
}

// Connect App to global state and bind the action creators so we can use them
@connect(mapStateToProps, mapDispatchToProps)
export default class AuthSignInPage extends PageBase {
  populate_meta() {
    this.meta.title = 'Sign In'
    this.meta.description = 'The best visual art events in Minneapolis and St. Paul'
  }

  constructor(props) {
    super(props);
    this.maybeSignIn = this.maybeSignIn.bind(this);
  }

  maybeSignIn(e) {
    const auth_type = e.target.getAttribute('data-auth-type');
    this.props.signIn(auth_type);
  }

  renderPage() {
    return (
      <div id="AuthSignInPageWrapper">
        <Row>
          <Col xs={12}>
              <h2>Sign In</h2>
              <p>If you have an account with mplsart.com, sign in. Otherwise, we will add you to the guest list for when we open the doors.</p>

          <form className="form-signin signIn mg-btm">
                <div className="social-box">

                  <div className="row">
                      <div className="col-md-12">

<a href="#" onClick={ this.maybeSignIn } data-auth-type={ AUTH_TYPES.BASIC } title="Basic" className="btn btn-block btn-social btn-lg btn-google-plus">
  <i className="fa fa-google-plus"></i> Sign in with UN/PW
</a>
<br />
<a href="#" onClick={ this.maybeSignIn } data-auth-type={ AUTH_TYPES.GOOGLE } title="Google" className="btn btn-block btn-social btn-lg btn-google-plus">
  <i className="fa fa-google-plus"></i> Sign in with Google
</a>


                      </div>
                  </div>


                </div>
            </form>




          </Col>
        </Row>
      </div>
    );
  }
}

