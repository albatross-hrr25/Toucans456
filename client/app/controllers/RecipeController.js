angular.module('app').controller('RecipeController', function ($scope, mainService, $state, authService) {
  // Set up use with Auth0 Service
  var vm = this;
  vm.auth = authService;

  ////////handle switch views via ng-if////////
  this.content = true;
  this.runUpload = () => {
    this.content = false;
  };


  //////// search bar ////////
  this.handleSearchResults = (query) => {
    mainService.search({
      query: query
    }, function (recipes) {
      $scope.recipes = recipes;
      $scope.$apply();
      console.log(recipes);
    });
  };


  this.handleClickHome = () => {
    this.content = true;
    mainService.getRecipes(null, function (recipes) {
      $scope.recipes = recipes;
      $scope.primaryRecipe = recipes[0];
      $scope.$apply();
    });
  };

  //////// GET service for primary recipe ////////
  this.selectRecipe = (recipe) => {
    console.log(recipe.id);
    $scope.primaryRecipe = recipe;

    // retrieve photos and associated data //
    mainService.getRecipe(recipe.id, function (resObj) {
      console.log('Retrieved data', resObj.data);
      var tags = resObj.data.Tags;

      $scope.selectRecipePhotos = resObj.data.Photos;
      $scope.selectRecipeTags = tags.map((cur) => cur = cur.Tag);
      $scope.selectRecipeIsStarred = resObj.data.isStarred;
      $scope.selectRecipeTitle = resObj.data.title;

      $scope.$apply();
    });
  };

  //////// recipe app initializion ////////
  mainService.getRecipes(null, function (recipes) {
    $scope.recipes = recipes;
    $scope.primaryRecipe = recipes[0];

    mainService.getRecipe($scope.primaryRecipe.id, function (resObj) {
      console.log('Retrieved data', resObj.data);
      var tags = resObj.data.Tags;

      $scope.selectRecipePhotos = resObj.data.Photos;
      $scope.selectRecipeTags = tags.map((cur) => cur = cur.Tag);
      $scope.selectRecipeIsStarred = resObj.data.isStarred;
      $scope.selectRecipeTitle = resObj.data.title;

      $scope.$apply();
    });
  });

  //////// allows user to logout ////////
  // this.logout = () => {
  //   console.log('Logging out');
  //   axios.defaults.headers.common['Authorization'] = 'Bearer logged out';
  //   store.remove('id_token');

  //   $state.go('tourist');
  // };

});

  //Checked kk