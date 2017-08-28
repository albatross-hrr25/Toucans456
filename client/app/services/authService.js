angular.module('app').service('authService', function($state, angularAuth0, authManager, $timeout) {

  // LOGIN
  // When user selects 'login', this will redirect to Auth0's
  // hosted Lock, which is where user will put in credentials
  function login() {
    console.log('The login function was invoked');
    angularAuth0.authorize();
  }

  // PARSE HASH
  // When user successfully authenticates, this will parse the
  // hash to get the idToken and accessToken
  function handleAuthentication() {
    angularAuth0.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        $state.go('home');
      } else if (err) {
        $timeout(function() {
          $state.go('home');
        });
        console.log('Error handling authentication: ', err);
      }
    });
  }

  // LOGOUT
  // When user selects 'logout', this will destroy the
  // access_token, id_token nad expires_at
  function logout() {
    console.log('The logout function was invoked');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  // SET SESSION
  // Save user's id_token and access_token to localStorage
  // Which configures successful log in
  // Also sets time that access token expires at
  function setSession(authResult) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  // IS AUTHENTICATED
  // Checks if user is logged in by returning whether or not
  // the current time is past the access token's expiry time
  function isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  return {
    login: login,
    handleAuthentication: handleAuthentication,
    logout: logout,
    isAuthenticated: isAuthenticated
  };

});