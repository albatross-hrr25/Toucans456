var mysql = require('mysql');
console.log('Showing mySQL URL: ', process.env.MYSQL_URL);
var dbConnection = mysql.createConnection(process.env.MYSQL_URL);

dbConnection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected SQLDB as id ' + dbConnection.threadId);
});

dbConnection.query('SELECT * FROM `test`', function (error, results, fields) {
  // error will be an Error if one occurred during the query 
  // results will contain the results of the query 
  console.log('Showing data feedback: ', results);
  // fields will contain information about the returned results fields (if any) 
});


// //Execute issue statement.
// dbConnection.query('CREATE DATABASE IF NOT EXISTS ' + 'recipes', function(error, results, fields) {
//   if (error) {
//     console.error('There was an error when creating the database', error);
//   } else {
//     console.log('Showing results: ', results);
//     console.log('Recipe database is present');
//   }
// });
