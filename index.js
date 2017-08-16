require('dotenv').config();
var mysql = require('./db/config.js');
var cloudinary = require('./client/cloudinary/cloudinaryConfig');
var port = process.env.PORT || 8000;

//this part only runs after config.js runs
mysql.createDatabase()
  .then(function() {
    //boot up the rest of the backend

    var server = require('./server/routes.js');

    //server is now listening
    server.listen(port);
    console.log('Listening on port ', port);
  })
  .catch(console.error);
