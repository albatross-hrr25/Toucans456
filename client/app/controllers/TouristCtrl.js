angular.module('app').controller('TouristCtrl', function ($scope, authService) {

  // Set up use with Auth0 Service
  $scope.auth = authService;

  // console.log('Show me auth: ', auth);


});