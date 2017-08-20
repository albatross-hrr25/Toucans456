angular.module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('tourist');

    var touristState = {
      name: 'tourist',
      url: '/tourist',
      component: 'tourist'
    };

    var primaryState = {
      name: 'primary',
      url: '/primary',
      component: 'app'
    };

    //TESTING//
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      resolve: {
        user: function($auth) {
          return $auth.getUser();
        }
      }
    });
    //to allow access to a view to go through or not
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      resolve: {
        user: function($auth) {
          return $auth.getUser()
            .then(function(user) {
              //can access resource?
              //return true/false
            })
        }
      }
    })

    //TESTING//

    $stateProvider.state(touristState);
    $stateProvider.state(primaryState);

  });
