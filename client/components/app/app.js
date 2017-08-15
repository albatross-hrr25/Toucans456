angular.module('app', [])

.component('app', {
  controller: 'RecipeController',
  templateUrl: 'client/components/app/app.html',
})

.controller ('RecipeController', function ($scope, get) {
  this.content = true;

  this.selectRecipe = (recipe) => {
    console.log(recipe);
    $scope.primaryRecipe = recipe;
  };

  this.runUpload = () => {
    console.log("clicked");
    this.content = false;
  };


  get.getRecipes(null, function (recipes) {
    $scope.recipes = recipes;
    $scope.primaryRecipe = recipes[0];
    $scope.$apply();
  });

});