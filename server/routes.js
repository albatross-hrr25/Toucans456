
var cloudinary = require('cloudinary');
var express = require('express');
//var intalize = require('./../db/config.js');
var bodyParser = require('body-parser');
var db = require('./../db/schema.js');

var app = express();
app.use(express.static(__dirname + '/../'));
app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());

// Finds all users from the database
app.get('/api/users', (request, response) => {
  db.User.findAll()
    .then((users) => {
      console.log(users);
      response.send(users);
    })
    .catch((error) => {
      response.send(error);
    });
});

// Finds all recipes from the database
app.get('/api/recipes', (request, response) => {
  // refactor to return tags as well as relevant data
  // -----------------------FIX TO FILTER BY USERNAME
  db.Recipes.findAll()
    .then((recipe) => {
      console.log(recipe);
      response.send(recipe);
    })
    .catch((error) => {
      response.send(error);
    });
});

// Adds a recipe and desired tags to the database
app.post('/api/recipes', (request, response) => {
  db.Recipe.create({
    // TODO: make adding title and Tags dynamic.
    title: 'Berry Tart',
    Tags: [
      { tag: 'creme anglaise'},
      { tag: 'almond crust'}
    ]
  }, {
    include: [ db.Tag ]
  })
  .then((recipeData) => {
    response.send(recipeData);
  })
  .catch((error) => {
    response.send(error);
  });
});

// Deletes a recipe from the database
app.delete('/api/recipes', (request, response) => {
  db.Recipe.findAll() //use findAll here?
    .then((recipes)=> {
      console.log(recipes[0]);
      return recipes[0].destroy();
    })
    .then(() => {
      console.log('Recipe DESTROYED.');
    });
});

module.exports = app;
