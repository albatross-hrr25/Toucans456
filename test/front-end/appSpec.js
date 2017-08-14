var expect = chai.expect;

describe("A test suite", function() {
   beforeEach(function() { });
   afterEach(function() { });
   it('should fail', function() { expect(true).to.be.false; });
});

describe('app', function () {
  var element;

  beforeEach(module('app'));
  beforeEach(module('templates'));

  beforeEach(inject(function($rootScope, $compile) {
    var scope = $rootScope.$new();
    //console.log('this is the scope', scope);
    //console.log('this is the compile', $compile);
    element = angular.element('<app></app>');
    element = $compile(element)(scope);

    $rootScope.$digest();
  }));

  it('should have a selectRecipe function on the scope', function() {
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
