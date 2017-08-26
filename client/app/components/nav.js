angular.module('app').component('navbar', {

  controller: 'NavTest',
  templateUrl: 'views/nav.html',
  bindings: {
    handlesearchresults: '<',
    handleclickhome: '<',
    logout: '<'
  }

});

//Checked KK