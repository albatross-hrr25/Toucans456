angular.module('app').controller ('ProfileCtrl', function ($scope, authService) {

    $scope.testmekevin = "Kevin is so cool.";

    var vm = this;
    vm.auth = authService;
    vm.profile;

    debugger;
    if (authService.getCachedProfile()) {
      vm.profile = authService.getCachedProfile();
      console.log('Showing Profile: ', vm.profile);
    } else {
      authService.getProfile(function(err, profile) {
        vm.profile = profile;
        $scope.$apply();
        console.log('Showing Profile: ', vm.profile);
      });
    }
    
});