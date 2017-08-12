angular.module('app', [])

.component('app', {
  controller: 'RecipeController',
  templateUrl: 'client/components/app/app.html',
})

.controller ('RecipeController', ['$scope', 'get', function ($scope, get) {

  $scope.recipes = get.getRecipes();

  console.log('this is $scope.recipes ', $scope.recipes);

  $scope.primaryRecipe = []

  console.log('ChangeLater is running: this is ', this);

}])

  // use get request service to grab all user's recipes
  // set all as inventory
  // set the first as primaryRecipe
