
var express = require('express');
var db = require('./../db/config.js')
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello world');
});
// var actions = {
//   'GET': function() {},
//   'POST': function() {},
//   'Delete': function() {}
// }
// if action[req.url === 'GET']
// action()
app.get('/api/recipes', (request, response) => {
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
  var newRecipe = new db.Recipe({
    title: 'Bananas Foster',
    tag: 'bananas'
  })
  .save()
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

// get /api/tags - read from tags table
// post /api/tags - write to tags table
// delete /api/tags - delete tags table

app.get('api/tags', (request, response) => {
  db.Tags.findAll()
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      response.send(error);
    })
})


// get /api/users - read from users table
// post /api/users - write to users table

module.exports = app;
