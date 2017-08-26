angular.module('app').service('authService', function($state, angularAuth0, authManager) {

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
  function handleParseHash() {
    angularAuth0.parseHash(
      {_idTokenVerification: false },
      function(err, authResult) {
        if (err) {
          console.log('Error with parsing hash: ', err);
        }
        if (authResult && authResult.idToken) {
          setUser(authResult);
        }
    });
  }

  // LOGOUT
  // When user selects 'logout', this will destroy the
  // accessToken and idToken
  function logout() {
    console.log('The logout function was invoked');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
  }

  // SET USER
  // Save user's id_token and access_token to localStorage
  // Which configures successful log in
  function setUser(authResult) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }

  // IS AUTHENTICATED
  // Checks if user is logged in by returning whether or not
  // there is a id_token in localStorage
  function isAuthenticated() {
    return authManager.isAuthenticated();
  }

  return {
    login: login,
    handleParseHash: handleParseHash,
    logout: logout,
    isAuthenticated: isAuthenticated
  };

});