angular.module('app')
  .controller ('PrimaryRecipeController', function ($scope) {

  })
  .component('primaryRecipe', {

    controller: 'PrimaryRecipeController',
    templateUrl: 'client/components/primary_recipe/primary-recipe.html',
    bindings: {
      recipe: '<'
    }

  });
