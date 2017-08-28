angular.module('app').controller ('ProfileCtrl', function ($scope, authService) {

    var vm = this;
    vm.auth = authService;
    vm.profile;

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