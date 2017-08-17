angular.module('app')
  .controller('TouristCtrl', function($scope, get) {
    get.login = () => {
      // utilizes a service
    };
  })
  .component('tourist', {
    controller: 'TouristCtrl',
    templateUrl: 'client/components/tourist/tourist.html'

  });