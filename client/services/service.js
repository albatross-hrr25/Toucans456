angular.module('app')

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

  this.getPhotos = function(config, callback) {
    console.log('getPhotos config', config);
    axios.get('/api/photos', {
      params: {
        UserId: config.UserId,
        id: config.id,
        title: config.title
      }
    })
    .then(function(photos) {
      console.log('Frontend GET photos success', photos.data);
      callback(photos.data);
    })
    .catch(function(err) {
      console.log('Frontend GET photos error', err);
    });
  };

  this.getTags = function(config, callback) {
    axios.get('/api/tags', {
      params: {
        UserId: config.UserId,
        id: config.id,
        title: config.title
      }
    })
    .then(function(tags) {
      console.log('Frontend GET Tags success', tags.data);
      callback(tags.data);
    })
    .catch(function(err) {
      console.log('Frontend GET Tags error', err);
    });
  };

  this.login = function (config, callback) {
    console.log('login is running');
    axios.get('/api/login', config)
      .then(function (token) {
        console.log('Frontend GET login success', token);
        callback(token);
      })
      .catch(function (err) {
        alert('login unsuccessful');
        console.log('This is the error form logn', err);
      });
  };

  this.signUp = (config, callback) => {
    // post request to '/api/signup'
    axios.post('/api/signup', config)
      .then((token) => {
        callback(token);
      })
      .catch((error) => {
        alert('Sign Up Failed!');
      });
  };

  this.uploadFileToUrl = function(file, uploadUrl){
    var fd = new FormData();
    fd.append('title', file.Title);
    fd.append('tags', file.Tags);
    fd.append('file', file.Photos[0]);

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
