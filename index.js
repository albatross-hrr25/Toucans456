//Changed expressed delcaration location.
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cloudinary = require('cloudinary');

//Loading .env file. -Heroku
require('dotenv').config();

// google cloud vision authentication
const gcloud = require('google-cloud')({
  keyFilename: process.env.google_key,
  projectId: 'kevin su'
});
const vision = gcloud.vision();

//Authorization Processor.
const jwt = require('express-jwt');
const jwks = require('jwks-rsa'); // Signing algorithm for JWT/Auth0
const cors = require('cors');
// const jwtAuthz = require('express-jwt-authz'); // for scope
// const jwt = require('jsonwebtoken');

//clean storage
const multer = require('multer');
const upload = multer({
  dest: 'uploads/'
});



//Database testing script.
// var testDB = require('./server/testDatabase.js');

//===INITIALIZE EXPRESS APP===================
const app = module.exports = express();
const port = process.env.PORT || 8000;

const mysql = require('./db/config.js');
const db = require('./db/schema.js');

const userCtrl = require('./server/userCtrl.js');
const recipeCtrl = require('./server/recipeCtrl.js');
const searchCtrl = require('./server/searchCtrl.js');

const cloudConfig = require('./server/cloudinaryConfig.js');

//===PORT====================================
app.listen(port, () => {
  console.log('Node is listening on port ', port, ' Stamp: ', Date());
});
//===PORT====================================

//this part only runs after config.js runs
// mysql.createDatabase()
//   .then(function() {

//     //boot up the rest of the backend
//     var server = require('./server/routes.js');

//     //server is now listening
//     server.listen(port);
//     console.log('Listening on port ', port);
//   })
//   .catch(console.error);


//========================================================
//=================Merged route.js========================
//========================================================


// =========Public root web Middleware======== //
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// =========Public root web Middleware======== //

// =========Authentication======== //
app.use(cors());

var checkJwt = jwt({
  // Dynamically provide a signing key based on the kind in the header and the signing keys provided by the JWKS endpoint
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://zhusufeng.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer
  audience: 'angular',
  issuer: 'https://zhusufeng.auth0.com/',
  algorithms: ['RS256']
});

// For checking scope
// const checkScopes = jwtAuthz([ 'read:messages' ]);
// const checkScopesAdmin = jwtAuthz([ 'write:messages' ]);

// Setting up sign in tokens
// app.use(expressJWT({
//   secret: 'rowdyHouse'
// }).unless({
//   path: ['/api/login', '/api/signup', '/']
// }));
// =========================

// =============End Points =================================

// ====User Control====
// Finds all users from the database
app.get('/api/users', userCtrl.findUser);
app.get('/api/login', userCtrl.login);
app.post('/api/signup', userCtrl.signup);

// TEST AUTHORIZATION
app.get('/api/public', function (req, res) {
  res.json({
    message: "Hello from a public endpoint! You don't need to be authenticated to see this."
  });
});

app.get('/api/private', checkJwt, function (req, res) {
  res.json({
    message: "You are logged in and can view this private message!"
  });
});
// ====================

// ====Recipes Control====
//--Search within Receipe--
app.get('/api/recipes', recipeCtrl.findRecipes);

//--Get data inside of that Receipe--
app.get('/api/recipe', recipeCtrl.getRecipeData);

//--Make New Receipe in the list--
app.post('/api/recipes', upload.array('file', 4), recipeCtrl.addRecipe);

//--Delete the Receipe--
app.delete('/api/recipes', recipeCtrl.removeRecipe);
// ====================

// ====Search Control ====
app.get('/api/search', searchCtrl.searchAll);
// =======================

app.post('/upload', multer({
  dest: './uploads/'
}).single('file'), function (req, res) {

  console.log('Showind body: ', req.body); // form fields for text
  console.log(req.file); // form files for image
  console.log('Showing Recipe: ', req.body.newRecipe); // form files for image
  console.log('Showing title: ', req.body.newRecipe.Title);

  // cloudinary upload
  cloudinary.v2.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log('Cloudinary Is Not Working');
    } else {
      console.log(result.url);

      console.log('To access tag input: ', req.body.newRecipe.Tags);

      
      db.Recipe.create({
        title: req.body.newRecipe.Title,
        imageUrl: result.url,
        Tags: req.body.newRecipe.Tags
      }, {
        include: [db.Tag]  //UPDATE THIS TO HANDLE USERNAME
      });
    }
  });
  
  
  // google cloud vision
  vision.detect(req.file.path, 'labels', function (err, detections, apiResponse) {
    if (err) {
      console.log('Google Cloud Vision Is Not Working');
    } else {
      var detectedText = JSON.stringify(detections, null, 4);
      console.log(detectedText);
      res.status(200).send(detectedText);
    }

  });
});