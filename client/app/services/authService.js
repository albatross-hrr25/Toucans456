angular.module('app').service('authService', function($state, angularAuth0, $timeout) {

  var userProfile;

  // LOGIN
  // When user selects 'login', this will redirect to Auth0's
  // hosted Lock, which is where user will put in credentials
  function login() {
    console.log('The login function was invoked');
    angularAuth0.authorize();
  }

  // HANDLE AUTHENTICATION
  // When user successfully authenticates, this will parse the
  // hash to get the idToken and accessToken
  function handleAuthentication() {
    angularAuth0.parseHash(function(err, authResult) {
      if (authResult && authResult.idToken) {
        setSession(authResult);
        console.log('Session was set!');
        $state.go('home');
      } else if (err) {
        $timeout(function() {
          $state.go('home');
        });
        console.log('Error handling authentication: ', err);
      }
    });
  }

  // GET PROFILE
  // Retrieves userInfo from Auth0
  function getProfile(cb) {
    var accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }
    angularAuth0.client.userInfo(accessToken, function(err, profile) {
      if (profile) {
        setUserProfile(profile);
      }
      cb(err, profile);
    });
  }

  // SET USER PROFILE
  // Saves profile to variable userProfile
  function setUserProfile(profile) {
    userProfile = profile;
  }

  // GET CACHED PROFILE
  // Return the variable userProfile
  function getCachedProfile() {
    return userProfile;
  }

  // LOGOUT
  // When user selects 'logout', this will destroy the
  // access_token, id_token, expires_at, scopes
  // Then redirects to the home route
  function logout() {
    console.log('The logout function was invoked');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    $state.go('home');
  }

  // SET SESSION
  // Save user's id_token, access_token, expires_at to localStorage
  // Which configures successful log in
  function setSession(authResult) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    console.log('authResult.scope is ', authResult.scope);
    console.log('REQUESTED_SCOPES is ', REQUESTED_SCOPES);
    var scopes = authResult.scope || REQUESTED_SCOPES || '';
    console.log('Your scopes are now ', scopes);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
  }

  // IS AUTHENTICATED
  // Checks if user is logged in by returning whether or not
  // the current time is past the access token's expiry time
  function isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  // USER HAS SCOPES
  function userHasScopes(scopes) {
    var grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    for (var i = 0; i < scopes.length; i++) {
      if (grantedScopes.indexOf(scopes[i]) < 0) {
        return false;
      }
    }
    return true;
  }

  return {
    login: login,
    getProfile: getProfile,
    getCachedProfile: getCachedProfile,
    handleAuthentication: handleAuthentication,
    logout: logout,
    isAuthenticated: isAuthenticated,
    userHasScopes: userHasScopes
  };

});