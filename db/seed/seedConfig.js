var mysql = require('mysql')
var dbConnection = mysql.createConnection({
  user: 'root',
  password: ''
});


exports.createDatabase = function () {
  return new Promise(function(resolve, reject) {
    dbConnection.connect(function(err) {
      if (err) {
        console.error('There was an error while connecting to MySQL', err);
        reject(err);
      } else {
        console.log('Beginning to seed example data into MySQL');
        resolve();
      }
    });
  })
  .then(function() {
    return new Promise(function(resolve, reject) {
        dbConnection.query('DROP DATABASE IF EXISTS recipes', function(err) {
          if (err) {
            console.error('There was an error when creating the database', err);
            reject(err);
          } else {
            console.log('MySQL database "recipes" dropped');
            resolve();
          }
        });
      });
    })
    .then(function() {
      return new Promise(function(resolve, reject) {
        dbConnection.query('CREATE DATABASE recipes', function(err) {
          if (err) {
            console.error('There was an error when creating the database', err);
            reject(err);
          } else {
            console.log('MySQL database "recipes" created');
            dbConnection.end();
            resolve();
          }
        });
      });
    })
  }
