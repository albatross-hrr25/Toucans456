
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
  // TODO: fine-tune the findAll method when we incorporate User-Auth.
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
  // TODO: FIX TO FILTER BY USERNAME
  db.Recipe.findAll()
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
  var userTags = [];
  request.body.Tags.forEach(tag => userTags.push(tag));

  var photoUrls = [];
  request.body.Photos.forEach(url => photoUrls.push(url));

  //how do we save username to recipes??
  db.Recipe.create({
    title: request.body.title,
    Photos: photoUrls,
    Tags: userTags
  }, {
    include: [ db.Tag, db.Photo ]
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
  db.Recipe.findAll({ title: request.body.title }) //use findAll here?
    .then((recipe)=> {
      console.log('Recipes is: ', recipes);
      return recipes[0].destroy();
    })
    .then(() => {
      console.log('Recipe DESTROYED.');
    });
});

module.exports = app;
