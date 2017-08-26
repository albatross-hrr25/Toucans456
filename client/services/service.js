angular.module('app')

.service('authService', function($state, angularAuth0, authManager) {

  // LOGIN
  // When user selects 'login', this will redirect to Auth0's
  // hosted Lock, which is where user will put in credentials
  function login() {
    console.log('The login function was invoked');
    angularAuth0.authorize();
  }

  // PARSE HASH
  // When user successfully authenticates, this will parse the
  // hash to get the idToken and accessToken
  function handleParseHash() {
    angularAuth0.parseHash(
      {_idTokenVerification: false },
      function(err, authResult) {
        if (err) {
          console.log('Error with parsing hash: ', err);
        }
        if (authResult && authResult.idToken) {
          setUser(authResult);
        }
    });
  }

  // LOGOUT
  // When user selects 'logout', this will destroy the
  // accessToken and idToken
  function logout() {
    console.log('The logout function was invoked');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
  }

  // SET USER
  // Save user's id_token and access_token to localStorage
  // Which configures successful log in
  function setUser(authResult) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }

  // IS AUTHENTICATED
  // Checks if user is logged in by returning whether or not
  // there is a id_token in localStorage
  function isAuthenticated() {
    return authManager.isAuthenticated();
  }

  return {
    login: login,
    handleParseHash: handleParseHash,
    logout: logout,
    isAuthenticated: isAuthenticated
  }

})
.service('get', function () {

  this.getRecipes = function (config, callback) {
    // --------------------FIX TO ADD USERNAME PARAMETER -stretch goal
    //Look below at getPhotos method to find out how

    axios.get('/api/recipes')
      .then(function (recipes) {
        callback(recipes.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };


  this.getRecipe = function(config, callback) {
      console.log('getPhotos config', config);
      axios.get('/api/recipe', {params: {config}
    })
    .then(function(responseObj) {
      console.log('Frontend GET photos success', responseObj);
      callback(responseObj);
    })
    .catch(function(err) {
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

  this.uploadFileToUrl = function(file, uploadUrl){
    var fd = new FormData();
    fd.append('title', file.Title);
    fd.append('tags', file.Tags);

    for(var i =0; i < file.Photos.length; i++){
       fd.append('file', file.Photos[i]);
    }
   // console.log(fd.get("file", file));
   // console.log(fd.getAll("file", file));


    axios.post(uploadUrl, fd, {
      headers: {'Content-type': 'multipart/form-data'}
    })
    .then(function(file) {
      console.log('uploadFile sucess');
    })
    .catch(function(err) {
      console.error(err);
    });
  };

  this.getHomepage = function() {
    axios.get('/primary')
      .then((primaryView) => {console.log('GETHOMEPAGE PRIMARYVIEW', primaryView);})
      .catch((error) => {});
  };

  this.search = function(config, callback) {
    axios.get('/api/search', {
      params: {
        query: config.query
      }
    })
    .then(function(results) {
      callback(results.data);
    })
    .catch(function(err) {
      console.log(err);
    });
  };

});
