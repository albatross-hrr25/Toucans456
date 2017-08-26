angular.module('app').component('primaryRecipe', {

  controller: 'PrimaryRecipeController',
  templateUrl: 'views/primary-recipe.html',
  bindings: {
    recipe: '<',
    photos: '<',
    tags: '<',
    star: '<',
    title: '<'
  }

});

//Checked KK