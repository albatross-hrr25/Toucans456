angular.module('app')

.controller ('NavTest', function () {
  this.user = 'nav';
  console.log(this);
})

.component('nav', {
  controller: 'NavTest',
  templateUrl: 'nav.html',
})