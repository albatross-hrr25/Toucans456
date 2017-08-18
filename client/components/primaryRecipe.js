angular.module('app')
  .controller ('PrimaryRecipeController', function ($scope) {

  })
  .component('primaryRecipe', {

    controller: 'PrimaryRecipeController',
    templateUrl: 'templates/primary-recipe.html',
    bindings: {
      recipe: '<'
    }

  });
