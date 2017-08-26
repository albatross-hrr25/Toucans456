const app = require('../index.js');
const db = require('../db/schema.js');

//Returns all recipes based on what was typed in search bar
exports.searchAll = (request, response) => {
  var queryString = "SELECT Recipes.* FROM RecipeTag LEFT JOIN Recipes on RecipeTag.RecipeId = Recipes.id LEFT JOIN Tags on RecipeTag.TagId = Tags.id WHERE Recipes.title like '%" + request.query.query.toString() + "%' OR Tags.tag like '%" + request.query.query.toString() + "%' GROUP BY id";

  db.db.query(queryString)
  .spread(function(recipes) {
    response.send(recipes);
  })
  .catch(function(error) {
    response.send(error);
  });
};




