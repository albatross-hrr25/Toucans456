angular.module('app') // ADD $NGROUTER HERE OR IN APP.JS?

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

    $stateProvider.state(touristState);
  })
  // .controller('TouristCtrl', function($scope) {

  // })
  .component('tourist', {
    bindings: {
      tourist: '<'
    },
    //controller: 'TouristCtrl',
    templateUrl: 'client/components/tourist/tourist.html'

  });