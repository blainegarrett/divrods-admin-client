// Google Auth Flow Process

import {AUTH_TYPES} from '../constants';

export function initialize(onSuccess, onFailure) {
  // Load the Google Platform Client

  console.log("here,,!!!!!");
  //const { clientId, scope, cookiePolicy, loginHint, hostedDomain } = this.props;

  let clientId = '945216243808-km8edqr2dp8etek3camju5dmrj7peai8.apps.googleusercontent.com';
  let scope = 'profile';
  let cookiePolicy = 'single_host_origin';
  let loginHint;
  let hostedDomain;

  ((d, s, id, cb) => {
    const element = d.getElementsByTagName(s)[0];
    const fjs = element;
    let js = element;
    js = d.createElement(s);
    js.id = id;
    js.src = '//apis.google.com/js/client:platform.js';
    fjs.parentNode.insertBefore(js, fjs);
    js.onload = cb;
  })(document, 'script', 'google`-login', () => {
    //console.log('derp derp derp');
    const params = {
      client_id: clientId,
      cookiepolicy: cookiePolicy,
      login_hint: loginHint,
      hosted_domain: hostedDomain,
      scope,
    };

    window.gapi.load('auth2', () => {

      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init(params);
        // TODO: There is a .then(onInit() method we may prefer to use)
      }

      let gauth = window.gapi.auth2.getAuthInstance();

      console.log('YODA');
      gauth.isSignedIn.listen(function() {
        // Listener for auth changes for google auth - both signin and signout

        // Dispatch that the google service is auth'd or not
        var google_user = gauth.currentUser.get();
        var id_token = google_user.getAuthResponse().id_token;

        // Dispatch action to see if there is a user with these credentials

        console.log(gauth.currentUser.get());
        onSuccess(AUTH_TYPES.GOOGLE, id_token);
      });
    });
  });
}

export function signIn(onSuccess, onFailure) {
  // Sign In To Google

  // Get the auth instance
  const auth2 = window.gapi.auth2.getAuthInstance();

  // Note: This flow only works for "online" access... vs. "offline"...
  let signinPromise = auth2.signIn();

  signinPromise.then(function(res) {
    // This was a successful login on the Google System
    // But Are they a member of our site?

    const basicProfile = res.getBasicProfile();
    const authResponse = res.getAuthResponse();

    // TODO: Setup a standard Auth Model with this info
    res.googleId = basicProfile.getId();
    res.tokenObj = authResponse;
    res.tokenId = authResponse.id_token;
    res.accessToken = authResponse.access_token;
    res.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName(),
    };

    // Call our success callback
    onSuccess(res);

  },
  function(err) {
    // They hit deny or cancel, etc on the prompt
    onFailure(err)
  });
}

export function signOut(){
    // Sign out of Google

    let gauth = window.gapi.auth2.getAuthInstance();
    gauth.signOut();
}