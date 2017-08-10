angular.module('app', [])
.controller ('GreetUserController', function () {
  this.user = 'world';
  console.log(this);
})

.component('greetUser', {
  controller: 'GreetUserController',
  templateUrl: '../templates/helloworld.html',
  });