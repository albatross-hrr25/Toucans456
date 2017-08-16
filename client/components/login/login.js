angular.module('app')

.controller ('LoginController', function ($scope, get) {

  // injecting localStorage and sessionStorage incorrectly.
  console.log("inventory", this);

  get.login(null, function (token) {
    console.log('this is from the login controller YAY!', token.data)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.data;
  });

})

.component('login', {
  controller: 'LoginController',
  templateUrl: 'client/components/login/login.html',
})
