angular.module('app')
  .controller ('NavTest', function () {
    this.user = 'nav';
  })
  .component('navbar', {

    controller: 'NavTest',
    templateUrl: 'templates/nav.html',
    bindings: {
      handlesearchresults: '<',
      handleclickhome: '<',
      logout: '<'
    }

  });
