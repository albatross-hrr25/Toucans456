console.log('TOURIST');

angular.module('app') // ADD $NGROUTER HERE OR IN APP.JS?

  .config(function($stateProvider) {
    console.log('inside TOURIST');
    //$urlRouterProvider.otherwise('/');

    var touristState = {
      name: 'tourist',
      url: '/tourist',
      templateUrl: 'client/components/tourist/tourist.html'
    }

    $stateProvider.state(touristState);
  });
  // .controller('TouristCtrl', function($scope) {

  // })
  // .component('tourist', {
  //   controller: 'TouristCtrl',
  //   //templateUrl: 'client/components/tourist/tourist.html',
  // });