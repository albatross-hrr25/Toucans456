angular.module('app')

  .config(function($stateProvider) {

    var touristState = {
      name: 'tourist',
      url: '/tourist',
      component: 'tourist'
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
      component: 'app'
    };

    $stateProvider.state(touristState);
    $stateProvider.state(primaryState);
  })
  .component('tourist', {

    templateUrl: 'client/components/tourist/tourist.html'

  });