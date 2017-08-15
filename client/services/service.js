angular.module('app')

.service('get', function () {

  this.getRecipes = function (config, callback) {
    // --------------------FIX TO ADD USERNAME PARAMETER
    axios.get('/api/recipes')
    .then(function (recipes) {
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