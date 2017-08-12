angular.module('app')

.service('get', function () {

  this.getRecipes = function (config, callback) {
    // -----------------------FIX TO ADD USERNAME PARAMETER
    axios.get('/api/recipes')
    .then(function (recipes) {
      console.log('recipes from server', recipes);
    })
    .catch(function (err) {
      console.log(err);
    });
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