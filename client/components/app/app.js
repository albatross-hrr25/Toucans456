angular.module('app')

.component('app', {
  controller: 'RecipeController',
  templateUrl: 'client/components/app/app.html',
})

.controller ('RecipeController', function ($scope, get) {

////////handle switch views via ng-if///////
  this.content = true;
  this.runUpload = () => {
    //console.log("clicked");
    this.content = false;
  };

////////search bar//////////////////////////
  this.handleSearchResults = (query) => {
    var results = $scope.recipes.filter((recipe) => {
      var pattern = ".*" + query.toString() + ".*";
      var re = new RegExp(pattern, "i");
      return recipe.title.toString().match(re) ? true : false;
    })
    $scope.recipes = results;
  };

  this.handleClickHome = () => {
    this.content = true;
    get.getRecipes(null, function (recipes) {
      $scope.recipes = recipes;
      $scope.primaryRecipe = recipes[0];
      $scope.$apply();
    });
  };

////////get service for primary recipe//////
  this.selectRecipe = (recipe) => {
    //console.log(recipe);
    $scope.primaryRecipe = recipe;

    //retrieve photos
    get.getPhotos(recipe, function(photos) {
      $scope.photos = photos;
      $scope.$apply();
    });

    //retrieve tags
    get.getTags(recipe, function(tags) {
      $scope.tags = tags;
      $scope.$apply();
    });
  };

////////get service for inventory ///////////
  get.getRecipes(null, function (recipes) {
    $scope.recipes = recipes;
    $scope.primaryRecipe = recipes[0];
    $scope.$apply();
  });

});
