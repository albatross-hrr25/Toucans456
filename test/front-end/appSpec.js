var expect = chai.expect;

describe("A test suite", function() {
   beforeEach(function() { });
   afterEach(function() { });
   it('should fail', function() { expect(true).to.be.false; });
});

describe('tourist component', function () {
  var element, $controller;

  beforeEach(module('app'));
  beforeEach(module('templates'));

  beforeEach(inject(function($controller, $rootScope, $compile) {
    var scope = $rootScope.$new();
    //$controller('RecipeController', {$scope: scope});
    //console.log('!!!!!!!!!!scope', scope);
    element = angular.element('<app></app>');
    element = $compile(element)(scope);
    //$rootScope.$digest();
  }));


  it('should have a selectRecipe function on the scope', function() {
    var $scope = {};
    //controller = $controller('TouristCtrl', {$scope: $scope});
    console.log(controller);
    expect(element.isolateScope().$ctrl.searchRecipe).to.exist;
  });



});

// describe('app', function () {
//   var sonicElement, recipeSpy;

//   beforeEach(module('inventory'));
//   beforeEach(module('templates'));

//   beforeEach(inject(function($rootScope, $compile) {
//     var sonicScope = $rootScope.$new();
//     sonicScope.user = 'bob';

//     sonicElement = angualr.element(' <h1>This is the {{$ctrl.user}}!</h1>');


//     });
//   )



// })
