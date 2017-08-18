angular.module('app')
  .controller ('NavTest', function () {
    this.user = 'nav';
  })
  .component('navbar', {

    controller: 'NavTest',
    templateUrl: 'components/nav/nav.html',
    bindings: {
      handlesearchresults: '<',
      handleclickhome: '<',
      logout: '<'
    }

  });
