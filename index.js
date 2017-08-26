//Changed expressed delcaration location.
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cloudinary = require('cloudinary');

//Authrization Processor.
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

//clean storage
const multer  = require('multer');
const upload = multer({ dest: 'uploads/'});

//Loading .env file. -Heroku
require('dotenv').config();

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
  console.log('Node is listening on port ', port,' Stamp: ', Date());
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
app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());
// =========Public root web Middleware======== //


// Setting up sign in tokens
app.use(expressJWT({
  secret: 'rowdyHouse'
}).unless({
  path: ['/api/login', '/api/signup', '/']
}));
// =========================

// =============End Points =================================

// ====User Control====
// Finds all users from the database
app.get('/api/users', userCtrl.findUser);
app.get('/api/login', userCtrl.login);

app.post('/api/signup', userCtrl.signup);
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

