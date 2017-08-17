angular.module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('primary');

    var touristState = {
      name: 'tourist',
      url: '/tourist',
      component: 'tourist',
      // Resolve block will be needed if we do any routing for touristState
      // resolve: {
      //   tourist: function(touristService) {
      //     // delegate to services which return a promise
      //     //
      //   }
      // }
    };

    var primaryState = {
      name: 'primary',
      url: '/primary',
      component: 'app',
      // resolve: {
      //   primary: function(primaryService) {
      //     // delegate to services which return a promise
      //     // serves up a User's primary view
      //     return get.getRecipes();
      //   }
      // }
    };

    $stateProvider.state(touristState);
    $stateProvider.state(primaryState);
  });
