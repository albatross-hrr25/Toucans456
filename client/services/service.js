angular.module('app')

.service('get', function () {

  this.getRecipes = function (config, callback) {
    // --------------------FIX TO ADD USERNAME PARAMETER
    //Look below at getPhotos method to find out how

    axios.get('/api/recipes')
    .then(function (recipes) {
      //console.log('get', recipes);
      callback(recipes.data);
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  // this.sendRecipe = function (query) {
  //   // --------------------FIX TO ADD USERNAME PARAMETER
  //   var {name, imageUrl, Tag} = query;
  //   axios.post('/api/recipe', {name, imageUrl, Tag})
  //   .then(function (res) {
  //     console.log(res);
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });
  // }

  this.getPhotos = function(config, callback) {
    console.log('getPhotos config', config);
    axios.get('/api/photos', {
      params: {
        UserId: config.UserId,
        id: config.id,
        title: config.title  //probably don't need this
      }
    })
    .then(function(photos) {
      console.log('Frontend GET photos success', photos.data);
      callback(photos.data);
    })
    .catch(function(err) {
      console.log('Frontend GET photos error', err);
    });
  }

  this.getTags = function(config, callback) {
    console.log('getTags config', config);
    axios.get('/api/tags', {
      params: {
        UserId: config.UserId,
        id: config.id,
        title: config.title //probably don't need this
      }
    })
    .then(function(tags) {
      console.log('Frontend GET Tags success', tags.data);
      callback(tags.data);
    })
    .catch(function(err) {
      console.log('Frontend GET Tags error', err);
    })
  }

  this.login = function (config, callback) {
    console.log('login is running')
    axios.get('/api/login', {
      params: {
        username: 'UnicornKiller'//config.username  //change this
      }
    })
    .then(function (token) {
      console.log('Frontend GET login success', token);
      callback(token);
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  this.uploadFileToUrl = function(file, uploadUrl){

        console.log('uploading file', file.Photos[0]);
        var fd = new FormData();
        fd.append('file', file.Photos[0]);
        console.log('FD contents', fd.get('file'));



        axios.post(uploadUrl, fd, {
          headers: {'Content-type': 'multipart/form-data'}
        })
        .then(function(file) {
          console.log('uploadFile sucess');
        })
        .catch(function(err) {
          console.error(err);
        })
  }



});



// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
