angular.module('app').controller('TouristCtrl', function (authService) {

  // Set up use with Auth0 Service
  var vm = this;
  vm.auth = authService;

});