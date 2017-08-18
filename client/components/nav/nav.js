angular.module('app')
  .controller ('NavTest', function () {
    this.user = 'nav';
  })
  .component('navbar', {

    controller: 'NavTest',
    templateUrl: 'client/components/nav/nav.html',
    bindings: {
      handlesearchresults: '<',
      handleclickhome: '<',
      logout: '<'
    }

  });
