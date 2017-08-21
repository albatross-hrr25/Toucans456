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
      // resolve: {
      //
      // }
    };


    $stateProvider.state(touristState);
    $stateProvider.state(primaryState);

  });
