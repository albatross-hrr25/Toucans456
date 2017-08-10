angular.
  module('app', []).
  component('greetUser', {
    templateUrl: '../templates/helloworld.html',
    controller: function GreetUserController() {
      this.user = 'world';
    }
  });