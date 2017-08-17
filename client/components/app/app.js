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


  // this.handleSearchResults = (query) => {
  // //QUERY can be tags or recipe or even a single letter
  //
  // //Start: query
  // //Check recipe titles in $scope.recipes that match query  //typing in recipes name almost
  //   //save those recipes in an array
  //
  //
  // //check recipe tags via tag DB that match query via query language  //typing in tag almost
  //   //save those recipes in an array
  // //remove deplicates
  // //display on $scope
  //
  //
  //
  //
  //
  //   console.log('HandleSearchResults query:', query);
  //   //this is the start of the filter
  //   var results = $scope.recipes.filter((recipe) => {
  //     console.log('Handling filter recipe:', recipe.title);
  //
  //     //takes query and turns it into a string
  //     var pattern = ".*" + query.toString() + ".*";
  //     //turns the string into a regex obj i = case insensitive
  //     var re = new RegExp(pattern, "i");
  //
  //     //Compares regex against every current recipe title
  //     var isTitleMatch = recipe.title.toString().match(re)
  //     //when this is true, filter spits back this element
  //     var isMatch = false;
  //
  //     var prom = new Promise(function(resolve, reject) {
  //       console.log('Calling upon getTags service from app.js');
  //       get.getTags({id: recipe.id}, function(tags) {
  //         //after invoking getTags these next lines come last
  //         console.log('Go to getTags service');
  //         tags.forEach(function(tag) {
  //           if(tag.tag.toString().match(re) || isTitleMatch) {
  //             console.log('forEach match on tag found');
  //             isMatch = true;
  //           }
  //         })
  //         console.log("RETURN isMatch:", isMatch)
  //         resolve();
  //       })
  //     }).then(function() {
  //       console.log('Get Tags right before isMatch filter');
  //       return true;
  //       //console.log('Does this resolve?');
  //       //resolve();
  //     })
  //     // prom.catch(function(error) {
  //     //   console.error('Promises didn\'t work yo');
  //     //   reject(error);
  //     // })
  //
  //
  //     // console.log("RETURN isMatch to filter:", isMatch)
  //     //return isTagMatch || recipe.title.toString().match(re) ? true : false;
  //     })
  //   console.log('Filtered recipe results: ', results)
  //   $scope.recipes = results;
  // };




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
