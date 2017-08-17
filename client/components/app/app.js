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

// this.handleSearchResults = (query) => {
//   var results = $scope.recipes.filter((recipe) => {
//     var pattern = ".*" + query.toString() + ".*";
//     var re = new RegExp(pattern, "i");
//     return recipe.title.toString().match(re) ? true : false;
//   })
//   $scope.recipes = results;
// };
  this.handleSearchResults = (query) => {
  // for each recipe
    // check if the title matches the regex
    // get the tags for this recipe
      // check if any of the tags match the regex


    var results = $scope.recipes.filter((recipe) => {
    var pattern = ".*" + query.toString() + ".*";
    var re = new RegExp(pattern, "i");
    var isTitleMatch = recipe.title.toString().match(re)
    var isMatch = false;

    get.getTags({id: recipe.id}, function(tags) {
      tags.forEach(function(tag) {
        if(tag.tag.toString().match(re) || isTitleMatch) {
          console.log("true!!!")
          isMatch = true;
        }
      })
      console.log("RETURN isMatch:", isMatch)
      //return isMatch;
    })

    console.log("GET TAGS THEN", get.getTags.then);
    // console.log("RETURN isMatch to filter:", isMatch)
    return isMatch;

      //return isTagMatch || recipe.title.toString().match(re) ? true : false;
    })

    console.log("results: ", results)
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
