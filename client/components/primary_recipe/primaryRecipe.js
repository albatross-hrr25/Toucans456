angular.module('app')

.controller ('PrimaryTest', function () {
  this.user = 'recipe';
  console.log('PrimaryTest controller has run: this is ', this);
})

.component('primaryRecipe', {
  controller: 'PrimaryTest',
  templateUrl: 'client/components/primary_recipe/primary-recipe.html'
})
