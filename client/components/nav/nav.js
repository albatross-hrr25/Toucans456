angular.module('app')

.controller ('NavTest', function () {
  this.user = 'nav';
  //console.log('NavTest controller has run: this is ', this);
})

.component('navbar', {
  controller: 'NavTest',
  templateUrl: 'client/components/nav/nav.html',
  bindings: {
    handlesearchresults: '<',
    handleclickhome: '<',
    logout: '<'
  }

})
