angular.module('app')

.controller ('PrimaryRecipeController', function ($scope) {
  console.log('PrimaryTest controller has run: this is ', this);

})

.component('primaryRecipe', {
<<<<<<< HEAD
  controller: 'PrimaryTest',
  templateUrl: 'client/components/primary_recipe/primary-recipe.html'
})
=======
  controller: 'PrimaryRecipeController',
  bindings: {
    recipe: '<'
  },
  templateUrl: '/components/primary_recipe/primary-recipe.html'
})
>>>>>>> Add getter service and inject into app controller
