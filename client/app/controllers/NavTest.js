angular.module('app').controller ('NavTest', function ($scope, authService) {
  $scope.auth = authService;
  this.user = 'nav';
});