angular.module('app')

.controller ('PrimaryRecipeController', function ($scope) {
  this.recipe = 'primaryRecipe'
  console.log('PrimaryTest controller has run: this is ', this);

  this.recipe = "primary recipe"

})

.component('primaryRecipe', {
  controller: 'PrimaryRecipeController',
  templateUrl: 'client/components/primary_recipe/primary-recipe.html'
})
