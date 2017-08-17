var cloudinary = require('cloudinary');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./../db/schema.js');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var cloudConfig = require('./../client/cloudinary/cloudinaryConfig')


var multer  = require('multer');
var upload = multer({ dest: 'uploads/'});
//clean storage

var app = express();
app.use(express.static(__dirname + '/../'));
app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());

//Setting up tokens
// app.use(expressJWT({
//   secret: 'rowdyHouse'
// }).unless({
//   path: ['/api/login', '/api/recipes']
// }));



/////////////////////////////////////////////////////////////
/////////////////////// GET REQUESTS ///////////////////////
////////////////////////////////////////////////////////////

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

// Gets a user's primary homepage
app.get('/primary', (request, response) => {
  // redirects user to /#!/primary

})

// Finds all recipes from the database
app.get('/api/recipes', (request, response) => {
  // TODO: FIX TO FILTER BY USERNAME

  //query username to retrieve their recipeId's
  console.log('Server GET Recipes request', request.query);

  db.Recipe.findAll()
    .then((recipe) => {
      //console.log(recipe);
      response.send(recipe);
    })
    .catch((error) => {
      response.send(error);
    });
});

//Returns all photos that was associated with the recipe that was clicked on
app.get('/api/photos', (request, response) => {
  //the query contains title, (recipe)iD,  and UserId
  console.log('Server GET Photos request', request.query);

  db.Photo.findAll({
    where: {
      RecipeId: request.query.id
    }
  })
    .then(function(photos) {
      console.log('Server GET Photos success');
      response.send(photos)
    })
    .catch(function(error) {
      console.log('Server GET Photos error');
      response.send(error);
    })
});

//Returns all tags associated with the recipe that was clicked on
app.get('/api/tags', (request, response) => {
  console.log('Server GET Tags request', request.query);

  db.Tag.findAll({
    include: [{
      model: db.Recipe,
      where: {
        id: request.query.id
      }
    }]
  })
  .then(function(tags) {
    console.log('Server GET Tags success');
    response.send(tags);
  })
  .catch(function(error) {
    console.log('Server GET Tags error');
    response.send(error);
  })
});



app.get('/api/login', (request, response) => {
  // TODO: fine-tune the findAll method when we incorporate User-Auth.
  db.User.findAll({
    where: {
      username: request.query.username
    }
  })
    .then((user) => {
      console.log(user);
      // compare passwords
      //TODO: FIX this next line (not suppose to be hash)
      if (user[0].dataValues.hash === request.query.hash) {
        var myToken = jwt.sign({
          username: request.query.username
        }, 'rowdyHouse');
        // redirect to homepage with token as header
        response.status(200).json(myToken);
      } else {
        // redirect back to login
        response.status(401).send('Invalid password');  //Change to redirect to login
      }
    })
    .catch((error) => {
      console.log('User does not exist');
      response.send(error);
    });
});

//////////////////////////////////////////////////////////////
/////////////////////// POST REQUESTS ///////////////////////
/////////////////////////////////////////////////////////////

app.post('/api/signup', (request, response) => {
  var username = request.query.username;
  var hash = request.query.hash;
  if (!username) {
    console.log('this is username', username)
    response.status(404).send('invalid username');
  }
  if (!hash) {
    console.log('this is password', hash)
    response.status(404).send('invalid password');
  }
  db.User.findAll({where: {username: username}})
  .then ((userData) => {
    if(userData.length > 0) {
      response.status(404).send('User already exists')
    } else {
      db.User.create({
        username: username,
        hash: hash
      })
      .then((user) => {
        var myToken = jwt.sign({
            username: username
        }, 'rowdyHouse');
        response.status(200).json(myToken);
      })
      .catch((error) => {
        response.status(404).json(error);
      })
    }
  })
  .catch((error) => {
    response.status(404).json(error);
  })
})

// Adds a recipe, desired tags, thumbnail url, and photos to the database
app.post('/api/recipes', upload.single('file'), (request, response) => {
  //UPDATE THIS TO HANDLE USERNAME
  var photoPath = request.file.path;
  var photoTitle = request.body.title;
  var photoTags = request.body.tags.split(",");

  return new Promise(function(resolve, reject){
    cloudConfig.uploadPhoto(photoPath, photoTitle, photoTags)
    .then(function(response){
      db.Recipe.create({
        title: response.public_id,
        imageUrl: response.secure_url,
        Photos: response.secure_url,
        Tags: response.tags
      }, {
        include: [ db.Tag, db.Photo ]  //UPDATE THIS TO HANDLE USERNAME
      })
      .then((recipeData) => {
        console.log('Server POST Recipe success');
        // response.send(recipeData);
      })
      .catch((error) => {
        console.log('Server POST Recipe error');
        // response.send(error);
      });
      resolve();
    })
    .catch(err => {
      console.error('Unable to upload', err);
      reject(err);
    })
  })


});

///////////////////////////////////////////////////////////////
/////////////////////// OTHER REQUESTS ///////////////////////
//////////////////////////////////////////////////////////////

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