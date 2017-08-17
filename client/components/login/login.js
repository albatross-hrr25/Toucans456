angular.module('app')

.controller ('LoginController', function ($scope, get) {

  get.login(null, function (token) {

    //TOKEN ALSO CONTAINS THE USERNAME IN token.config.params
      //SET THE USERNAME ON THE APP MODULE SCOPE.
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.data;
  });

  //POSSIBLY REDICRECT TO LOGIN HERE

})

.component('login', {
  controller: 'LoginController',
  templateUrl: 'client/components/login/login.html',
})
