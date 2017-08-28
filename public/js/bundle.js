'use strict';

angular.module('app', ['auth0.auth0', 'ui.router', 'angular-jwt', 'ngFileUpload']).config(function ($stateProvider, $urlRouterProvider, $locationProvider, jwtOptionsProvider, angularAuth0Provider, $httpProvider) {

  $stateProvider.state('home', {
    url: '/',
    template: '<recipe-view></recipe-view>'
  }).state('profile', {
    url: '/profile',
    template: '<profile></profile>',
    onEnter: checkAuthentication
  }).state('callback', {
    url: '/callback',
    template: '<callback></callback>'
  });

  // Initialization for the angular-auth0 library
  angularAuth0Provider.init({
    clientID: AUTH0_CLIENT_ID,
    domain: AUTH0_DOMAIN,
    responseType: 'token id_token',
    redirectUri: AUTH0_CALLBACK_URL,
    audience: AUTH0_API_AUDIENCE,
    scope: REQUESTED_SCOPES
  });

  // Configure a tokenGetter so that the isAuthenticated
  // method from angular-jwt can be used
  jwtOptionsProvider.config({
    tokenGetter: function tokenGetter() {
      return localStorage.getItem('id_token');
    },
    whiteListedDomains: ['localhost', '127.0.0.1', 'recipes-archive.herokuapp.com']
  });

  $httpProvider.interceptors.push('jwtInterceptor');

  $urlRouterProvider.otherwise('/');

  // Remove the ! from the hash so that
  // auth0.js can properly parse it
  $locationProvider.hashPrefix('');

  // Comment out the line below to run the app
  // without HTML5 mode (will use hashes in routes)
  // $locationProvider.html5Mode(true);

  function checkAuthentication($transition$) {
    var $state = $transition$.router.stateService;
    var auth = $transition$.injector().get('authService');
    if (!auth.isAuthenticated()) {
      return $state.target('home');
    }
  }

  function checkForScopes(scopes) {
    return function checkAuthentication($transition$) {
      var $state = $transition$.router.stateService;
      var auth = $transition$.injector().get('authService');
      if (!auth.isAuthenticated() || !auth.userHasScopes(scopes)) {
        return $state.target('home');
      }
    };
  }
});
'use strict';

angular.module('app').run(function ($rootScope, authService) {

  $rootScope.auth = authService;

  // Process authentication result in the hash
  authService.handleAuthentication();
});
'use strict';

var AUTH0_CLIENT_ID = 'aZbdnVihkR6huEZNVWBRFkTb2l5I1Tk5';
var AUTH0_DOMAIN = 'zhusufeng.auth0.com';
var AUTH0_CALLBACK_URL = 'http://localhost:8000/';
var AUTH0_API_AUDIENCE = 'angular';
var REQUESTED_SCOPES = 'openid profile read:messages write:messages';
'use strict';

angular.module('app').component('callback', {

  controller: 'CallbackCtrl',
  templateUrl: 'views/callback.html'

});
'use strict';

angular.module('app').component('inventory', {

  controller: 'InventoryCtrl',
  templateUrl: 'views/inventory.html',
  bindings: {
    recipes: '<',
    onClick: '<'
  }

});

//Checked KK
'use strict';

angular.module('app').component('inventoryEntry', {

  controller: 'InventoryEntryCtrl',
  templateUrl: 'views/inventoryEntry.html',
  bindings: {
    recipe: '<',
    onClick: '<'
  }

});

//Checked KK
'use strict';

angular.module('app').component('main', {
  controller: 'mainCtrl',
  templateUrl: 'views/main.html'

});
'use strict';

angular.module('app').component('navbar', {

  controller: 'NavTest',
  templateUrl: 'views/nav.html',
  bindings: {
    handlesearchresults: '<',
    handleclickhome: '<',
    logout: '<'
  }

});

//Checked KK
'use strict';

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
'use strict';

angular.module('app').component('profile', {

  controller: 'ProfileCtrl',
  templateUrl: 'views/profile.html'

});
'use strict';

angular.module('app').component('recipeView', {

  controller: 'RecipeController',
  templateUrl: 'views/recipeView.html'

});

//Checked KK
'use strict';

angular.module('app').component('tourist', {

  controller: 'TouristCtrl',
  templateUrl: 'views/tourist.html'

});

//Checked KK
'use strict';

angular.module('app').component('uploadRecipe', {
  controller: 'UploadRecipeCtrl',
  templateUrl: 'views/uploadRecipe.html'
});

//Checked KK
'use strict';

angular.module('app').controller('CallbackCtrl', function () {});
'use strict';

angular.module('app').controller('InventoryCtrl', function () {});
'use strict';

angular.module('app').controller('InventoryEntryCtrl', function () {});
'use strict';

angular.module('app').controller('NavTest', function ($scope, authService) {
  $scope.auth = authService;
  this.user = 'nav';
});
'use strict';

angular.module('app').controller('PrimaryRecipeController', function ($scope) {});
'use strict';

angular.module('app').controller('ProfileCtrl', function ($scope, authService) {

  $scope.testmekevin = "Kevin is so cool.";

  var vm = this;
  vm.auth = authService;
  vm.profile;

  debugger;
  if (authService.getCachedProfile()) {
    vm.profile = authService.getCachedProfile();
    console.log('Showing Profile: ', vm.profile);
  } else {
    authService.getProfile(function (err, profile) {
      vm.profile = profile;
      $scope.$apply();
      console.log('Showing Profile: ', vm.profile);
    });
  }
});
'use strict';

angular.module('app').controller('RecipeController', function ($scope, mainService, $state, authService) {
  var _this = this;

  // Set up use with Auth0 Service
  var vm = this;
  vm.auth = authService;

  ////////handle switch views via ng-if////////
  this.content = true;
  this.runUpload = function () {
    _this.content = false;
  };

  //////// search bar ////////
  this.handleSearchResults = function (query) {
    mainService.search({
      query: query
    }, function (recipes) {
      $scope.recipes = recipes;
      $scope.$apply();
      console.log(recipes);
    });
  };

  this.handleClickHome = function () {
    _this.content = true;
    mainService.getRecipes(null, function (recipes) {
      $scope.recipes = recipes;
      $scope.primaryRecipe = recipes[0];
      $scope.$apply();
    });
  };

  //////// GET service for primary recipe ////////
  this.selectRecipe = function (recipe) {
    console.log(recipe.id);
    $scope.primaryRecipe = recipe;

    // retrieve photos and associated data //
    mainService.getRecipe(recipe.id, function (resObj) {
      console.log('Retrieved data', resObj.data);
      var tags = resObj.data.Tags;

      $scope.selectRecipePhotos = resObj.data.Photos;
      $scope.selectRecipeTags = tags.map(function (cur) {
        return cur = cur.Tag;
      });
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
      $scope.selectRecipeTags = tags.map(function (cur) {
        return cur = cur.Tag;
      });
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
'use strict';

angular.module('app').controller('TouristCtrl', function ($scope, authService) {

  // Set up use with Auth0 Service
  $scope.auth = authService;

  // console.log('Show me auth: ', auth);

});
'use strict';

angular.module('app').controller('UploadRecipeCtrl', function ($scope, $timeout, mainService, Upload) {
  var _this = this;

  this.newRecipe = {};
  this.showFailModal = function () {
    $("#myModalfailed").modal('show');
  };

  this.showSuccessModal = function () {
    $("#myModalsuccess").modal('show');
  };

  this.handlePhotoSubmit = function (file) {
    //Retrieves all files from angular component
    var addedPhotos = angular.element(document.querySelector("#upload_field"))[0].files;

    //Retrieves all tags from angular component
    var addedTags = angular.element(document.getElementsByName("yolo"))[0].value;

    console.log(file);
    file.upload = Upload.upload({
      url: '/upload',
      data: { file: file }
    });

    file.upload.then(function (response) {
      console.log('success!', response);
      $scope.imageData = response.data;
    }, function (result) {
      console.log('error :(', result);
    });

    _this.newRecipe["Tags"] = addedTags.split(",");
    _this.newRecipe["Photos"] = addedPhotos;
    console.log("MEMEMEMEMEMEMEMEMMEMEMEME", _this.newRecipe);

    if (!!_this.newRecipe.Title && addedPhotos.length !== 0) {
      mainService.uploadFileToUrl(_this.newRecipe, '/api/recipes');
      _this.showSuccessModal();
    } else {
      _this.showFailModal();
      return false;
    }

    $('#form_id').trigger("reset");
    $(".tm-input").tagsManager('empty');
  };

  $timeout(function () {
    // code to execute after directives goes here
    $(".tm-input").tagsManager({
      hiddenTagListName: "yolo"
    });
  });
});
'use strict';

angular.module('app').controller('mainCtrl', function () {});
'use strict';

angular.module('app').service('authService', function ($state, angularAuth0, $timeout) {

  var userProfile;

  // LOGIN
  // When user selects 'login', this will redirect to Auth0's
  // hosted Lock, which is where user will put in credentials
  function login() {
    console.log('The login function was invoked');
    angularAuth0.authorize();
  }

  // HANDLE AUTHENTICATION
  // When user successfully authenticates, this will parse the
  // hash to get the idToken and accessToken
  function handleAuthentication() {
    angularAuth0.parseHash(function (err, authResult) {
      if (authResult && authResult.idToken) {
        setSession(authResult);
        console.log('Session was set!');
        $state.go('home');
      } else if (err) {
        $timeout(function () {
          $state.go('home');
        });
        console.log('Error handling authentication: ', err);
      }
    });
  }

  // GET PROFILE
  // Retrieves userInfo from Auth0
  function getProfile(cb) {
    var accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }
    angularAuth0.client.userInfo(accessToken, function (err, profile) {
      if (profile) {
        setUserProfile(profile);
      }
      cb(err, profile);
    });
  }

  // SET USER PROFILE
  // Saves profile to variable userProfile
  function setUserProfile(profile) {
    userProfile = profile;
  }

  // GET CACHED PROFILE
  // Return the variable userProfile
  function getCachedProfile() {
    return userProfile;
  }

  // LOGOUT
  // When user selects 'logout', this will destroy the
  // access_token, id_token, expires_at, scopes
  // Then redirects to the home route
  function logout() {
    console.log('The logout function was invoked');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    $state.go('home');
  }

  // SET SESSION
  // Save user's id_token, access_token, expires_at to localStorage
  // Which configures successful log in
  function setSession(authResult) {
    var expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());

    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    console.log('authResult.scope is ', authResult.scope);
    console.log('REQUESTED_SCOPES is ', REQUESTED_SCOPES);
    var scopes = authResult.scope || REQUESTED_SCOPES || '';
    console.log('Your scopes are now ', scopes);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
  }

  // IS AUTHENTICATED
  // Checks if user is logged in by returning whether or not
  // the current time is past the access token's expiry time
  function isAuthenticated() {
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  // USER HAS SCOPES
  function userHasScopes(scopes) {
    var grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    for (var i = 0; i < scopes.length; i++) {
      if (grantedScopes.indexOf(scopes[i]) < 0) {
        return false;
      }
    }
    return true;
  }

  return {
    login: login,
    getProfile: getProfile,
    getCachedProfile: getCachedProfile,
    handleAuthentication: handleAuthentication,
    logout: logout,
    isAuthenticated: isAuthenticated,
    userHasScopes: userHasScopes
  };
});
'use strict';

angular.module('app').service('mainService', function () {

  this.getRecipes = function (config, callback) {
    // --------------------FIX TO ADD USERNAME PARAMETER -stretch goal
    //Look below at getPhotos method to find out how

    axios.get('/api/recipes').then(function (recipes) {
      callback(recipes.data);
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.getRecipe = function (config, callback) {
    console.log('getPhotos config', config);
    axios.get('/api/recipe', { params: { config: config }
    }).then(function (responseObj) {
      console.log('Frontend GET photos success', responseObj);
      callback(responseObj);
    }).catch(function (err) {
      console.log('Frontend GET photos error', err);
    });
  };

  // this.login = function (config, callback, failedAlert) {
  //   console.log('login is running');
  //   axios.get('/api/login', config)
  //     .then(function (token) {
  //       console.log('Frontend GET login success', token);
  //       callback(token);
  //     })
  //     .catch(function (err) {
  //       failedAlert();
  //       console.log('This is the error form logn', err);
  //     });
  // };

  // this.signUp = (config, callback, failedAlert) => {
  //   console.log(config)
  //   // post request to '/api/signup'
  //   axios.post('/api/signup', config)
  //     .then((token) => {
  //       callback(token);
  //     })
  //     .catch((error) => {
  //       failedAlert();
  //       console.log(error);
  //     });
  // };

  this.uploadFileToUrl = function (file, uploadUrl) {
    var fd = new FormData();
    fd.append('title', file.Title);
    fd.append('tags', file.Tags);

    for (var i = 0; i < file.Photos.length; i++) {
      fd.append('file', file.Photos[i]);
    }
    // console.log(fd.get("file", file));
    // console.log(fd.getAll("file", file));


    axios.post(uploadUrl, fd, {
      headers: { 'Content-type': 'multipart/form-data' }
    }).then(function (file) {
      console.log('uploadFile sucess');
    }).catch(function (err) {
      console.error(err);
    });
  };

  this.getHomepage = function () {
    axios.get('/primary').then(function (primaryView) {
      console.log('GETHOMEPAGE PRIMARYVIEW', primaryView);
    }).catch(function (error) {});
  };

  this.search = function (config, callback) {
    axios.get('/api/search', {
      params: {
        query: config.query
      }
    }).then(function (results) {
      callback(results.data);
    }).catch(function (err) {
      console.log(err);
    });
  };
});
//# sourceMappingURL=bundle.js.map
