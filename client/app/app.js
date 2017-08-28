angular.module('app', ['auth0.auth0', 'ui.router', 'angular-jwt'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, jwtOptionsProvider, angularAuth0Provider, $httpProvider) {

    $stateProvider
    .state('home', {
      url: '/',
      template: '<tourist></tourist>', 
    })
    .state('primary', {
      url: '/primary',
      template: '<main></main>',
      onEnter: checkAuthentication
    })
    .state('callback', {
      url: '/callback',
      template: '<callback></callback>'
    });

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      responseType: 'token id_token',
      redirectUri: AUTH0_CALLBACK_URL,
      audience: AUTH0_API_AUDIENCE,
      scope: REQUESTED_SCOPES
    });
    
    // Configure a tokenGetter so that the isAuthenticated
    // method from angular-jwt can be used
    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost', '127.0.0.1', 'recipes-archive.herokuapp.com']
    });

    $httpProvider.interceptors.push('jwtInterceptor');
    
    $urlRouterProvider.otherwise('/');

    // Remove the ! from the hash so that
    // auth0.js can properly parse it
    $locationProvider.hashPrefix('');
    
    // Comment out the line below to run the app
    // without HTML5 mode (will use hashes in routes)
    // $locationProvider.html5Mode(true);

    function checkAuthentication($transition$) {
      var $state = $transition$.router.stateService;
      var auth = $transition$.injector().get('authService');
      if (!auth.isAuthenticated()) {
        return $state.target('home');
      }
    }

    function checkForScopes(scopes) {
      return function checkAuthentication($transition$) {
        var $state = $transition$.router.stateService;
        var auth = $transition$.injector().get('authService');
        if (!auth.isAuthenticated() || !auth.userHasScopes(scopes)) {
          return $state.target('home');
        }
      }
    }
  });
