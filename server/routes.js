var express = require('express');
//var intalize = require('./../db/config.js');
var bodyParser = require('body-parser');
var db = require('./../db/schema.js');

var app = express();
app.use(express.static(__dirname + '/../'));
app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());

// var actions = {
//   'GET': function() {},
//   'POST': function() {},
//   'Delete': function() {}
// }
// if action[req.url === 'GET']
// action()
app.get('/api/recipes', (request, response) => {
  // refactor to return tags as well as relevant data
  // -----------------------FIX TO FILTER BY USERNAME
  db.Recipe.findAll()
    .then((recipe) => {
      response.send(recipe);
    })
    .catch((error) => {
      response.send(error);
    });
});

app.post('/api/recipes', (request, response) => {
  // get relevant info from request
  console.log('REQUEST IS: ', request.body);

  db.Recipe.create({
    title: 'Fortune Cookie',
    Tags: [
      { tag: '123'},
      { tag: 'abc'}
    ]
  }, {
    include: [ db.Tag ]
  })

  .then((recipeData) => {
    response.send(recipeData);
  })
  .catch((error) => {
    console.log('BAD BAD BAD');
    response.send(error);
  });
});

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
// get /api/recipes -read from the recipes table
// delete /api/recipes - delete from recipes table



// get /api/users - read from users table
// post /api/users - write to users table

module.exports = app;
