angular.module('app')
  .component('app', {

    controller: 'RecipeController',
    templateUrl: 'templates/app.html'

  })
  .controller ('RecipeController', function ($scope, get, $state) {


  ////////handle switch views via ng-if///////
    this.content = true;
    this.runUpload = () => {
      this.content = false;
    };


  ////////search bar//////////////////////////
    this.handleSearchResults = (query) => {
      get.search({query: query}, function(recipes){
        $scope.recipes = recipes;
        $scope.$apply();
        console.log(recipes);
      });
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
    console.log(recipe.id);
    $scope.primaryRecipe = recipe;

    //retrieve photos
    get.getRecipe(recipe.id, function(resObj) {
      console.log('Retrieved data', resObj.data)

      $scope.selectRecipePhotos = resObj.data.Photos;
      $scope.selectRecipeTags = resObj.data.Tags;
      $scope.selectRecipeIsStarred = resObj.data.isStarred;
      $scope.selectRecipeTitle = resObj.data.title;

      $scope.$apply();
    });

    //retrieve tags
    // get.getTags(recipe, function(tags) {
    //   $scope.tags = tags;
    //   $scope.$apply();
    // });
  };

////////get service for inventory ///////////
  get.getRecipes(null, function (recipes) {
    $scope.recipes = recipes;
    $scope.primaryRecipe = recipes[0];

    get.getRecipe($scope.primaryRecipe.id, function(resObj) {
      console.log('Retrieved data', resObj.data)

      $scope.selectRecipePhotos = resObj.data.Photos;
      $scope.selectRecipeTags = resObj.data.Tags;
      $scope.selectRecipeIsStarred = resObj.data.isStarred;
      $scope.selectRecipeTitle = resObj.data.title;

      $scope.$apply();
    });
  });




    this.logout = () => {
      console.log('Logging out');
      axios.defaults.headers.common['Authorization'] = 'Bearer logged out';
      $state.go('tourist');
    };

  });
