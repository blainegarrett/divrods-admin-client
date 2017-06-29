//https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
// actions.js

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  console.log('receiveLogin');
  console.log('THE user param IS ACTUALLY the full on response ');
  console.log(user);
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Logs the user out
export function logoutUser() {
  console.log('fark');
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    dispatch(receiveLogout())
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  let auth_token = window.btoa(creds.username + ":" + creds.password);
  console.log(auth_token)

  let data = {auth_type:'BASIC', auth_token:auth_token}

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(data)
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch('http://localhost:9090/api/auth/authenticate', config)
      .then(response =>
        response.json().then(result => ({ result, response }))
            ).then(({ result, response }) =>  {

              console.log('snafooooooooooo');
              console.log(result);
              console.log(response);

        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(result.messages))
          return Promise.reject(result)
        } else {
          let user = result.results;


          console.log("HERE!!!!!!!!!!!");
          console.log(user);

          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)
          localStorage.setItem('access_token', user.access_token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}