angular.module('app')
.controller ('PrimaryRecipeController', function ($scope) {
  //console.log('PrimaryTest controller has run: this is ', this);
  console.log("Primary recipe scope: ", $scope)
  console.log("Primary recipe this: ", this)
  // this.displayContentone =  this.recipe.imageUrl||this.recipe.imageUrl
  // this.displayContenttwo = this.recipe.imageUrl||this.recipe.imageUrl
  // this.displayContentthree =  this.recipe.imageUrl||this.recipe.imageUrl
})
.component('primaryRecipe', {
    controller: 'PrimaryRecipeController',
    templateUrl: 'templates/primary-recipe.html',
    bindings: {
      recipe: '<',
      photos: '<',
      tags: '<',
      star: '<',
      title: '<'
    }

});
