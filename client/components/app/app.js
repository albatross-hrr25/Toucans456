angular.module('app', [])

.component('app', {
  controller: 'RecipeController',
  templateUrl: 'client/components/app/app.html',
})

.controller ('RecipeController', ['$scope', 'get', function ($scope, get) {

  // Get recipes by user from server and set into scope
  get.getRecipes(null, function (recipes) {
    $scope.recipes = recipes;
    $scope.primaryRecipe = recipes[0];
    console.log($scope.recipes);
  });



}])