var mysql = require('mysql')
var Sequelize = require('sequelize');

var dbConnection = mysql.createConnection({
  user: 'root',
  password: ''
});

dbConnection.connect(function(err) {
  if (err) {
    console.error('There was an error while connecting to MySQL', err);
  } else {
    console.log('Welcome to MySQL');
  }
});

// dbConnection.connect();
// console.log('Welcome to MySQL');

dbConnection.query('CREATE DATABASE IF NOT EXISTS ' + 'recipes', function(err) {
  if (err) {
    console.error('There was an error when creating the database', err);
  } else {
    console.log('Recipe database is present');
  }
});

// dbConnection.query('CREATE DATABASE IF NOT EXISTS ' + 'recipes');
// console.log('Recipe database is present');

dbConnection.end();
