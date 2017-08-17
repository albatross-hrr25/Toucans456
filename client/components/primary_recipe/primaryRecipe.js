angular.module('app')

.controller ('PrimaryRecipeController', function ($scope) {
  //console.log('PrimaryTest controller has run: this is ', this);

  console.log($scope)

})

.component('primaryRecipe', {
  controller: 'PrimaryRecipeController',
  templateUrl: 'client/components/primary_recipe/primary-recipe.html',
  bindings: {
    recipe: '<'
  }
})
