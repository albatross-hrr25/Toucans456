angular.module('app')

  .run(function ($rootScope, authService) {

    $rootScope.auth = authService;
    
    // Process authentication result in the hash
    authService.handleAuthentication();  
  });