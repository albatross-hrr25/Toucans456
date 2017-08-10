angular.module('app')

.controller ('NavTest', function () {
  this.user = 'nav';
  console.log('NavTest controller has run: this is ', this);
})

.component('navbar', {
  controller: 'NavTest',
  templateUrl: '/components/nav/nav.html',
})