angular.module('app', ['auth0.auth0', 'ui.router', 'angular-jwt'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, jwtOptionsProvider, angularAuth0Provider) {

    var touristState = {
      name: 'tourist',
      url: '/tourist',
      component: 'tourist',
      controllerAs: 'vm'
    };

    var primaryState = {
      name: 'primary',
      url: '/primary',
      component: 'app',
      controllerAs: 'vm'
    };

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      responseType: 'token id_token',
      redirectUri: AUTH0_CALLBACK_URL,
      audience: AUTH0_API_AUDIENCE,
    });
    
    // Configure a tokenGetter so that the isAuthenticated
    // method from angular-jwt can be used
    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      }
    });
    
    $urlRouterProvider.otherwise('tourist');

    // Remove the ! from the hash so that
    // auth0.js can properly parse it
    $locationProvider.hashPrefix('');

  });

// ///////// JWT /////////
//     jwtOptionsProvider.config({
//       //unauthenticatedRedirectPath: '/login',
//       tokenGetter: function() {
//         return localStorage.getItem('id_token');  //where does this come from
//       },
//       whiteListedDomains: ['127.0.0.1', 'localhost']
//     });

//     jwtInterceptorProvider.tokenGetter = function(store) {
//       return store.get('id_token');
//     }
// ///////// REDIRECT /////////
//     // redirect = function($q, $timeout, store, $location) {
//     //   $timeout(function() {
//     //     store.get('id_token');
//     //     console.log('running timeout');
//     //   })
//     //   return {
//     //     responseError: function(err) {
//     //       if(err.status === 401) {
//     //         console.log('There is an error: ', err);
//     //         $location.path('/tourist');
//     //       }
//     //       return $q.reject(err);
//     //     }
//     //   }
//     // }

// ///////// REGISTERING STATES AND FUNCTIONS /////////
//     $httpProvider.interceptors.push('jwtInterceptor');
//     //$httpProvider.interceptors.push('redirect');

//     $stateProvider.state(touristState);
//     $stateProvider.state(primaryState);

//   })
//   .run(function($rootScope, $state, $location, jwtHelper, store) {
//     $rootScope.$on('$locationChangeStart', function() {
//       var token = store.get('id_token');

//       if (token) {  //does this token exist?
//         if (typeof token === 'object') {
//           token = token.data;
//         }
//         if (jwtHelper.isTokenExpired(token) === false) {  //is it expired?
//           console.log('Staying at primary');
//           axios.defaults.headers.common.Authorization = 'Bearer ' + token;

//           $location.path('/primary');  //head to the primary page
//         } else {  //if it is expired head back to tourist page
//           console.log('Going home to tourist');
//           $location.path('/tourist');
//         }
//       } else {  //no token
//         console.log('Going home to tourist');
//         $location.path('/tourist');
//       }
//     });
//   });
