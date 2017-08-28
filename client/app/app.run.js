angular.module('app')

  .run(function (authService) {

    // Process authentication result in the hash
    authService.handleAuthentication();  
  });