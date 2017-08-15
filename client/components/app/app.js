angular.module('app', [])

.component('app', {
  controller: 'RecipeController',
  templateUrl: 'client/components/app/app.html',
})

.controller ('RecipeController', function ($scope, get) {

  this.selectRecipe = (recipe) => {
    console.log(recipe);
    $scope.primaryRecipe = recipe;
  };

  get.getRecipes(null, function (recipes) {
    $scope.recipes = recipes.slice(0, 5);
    $scope.primaryRecipe = recipes[0];
    $scope.$apply();
  });

});