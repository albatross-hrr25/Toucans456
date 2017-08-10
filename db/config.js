var Sequelize = require('sequelize');

console.log('config.js has been served');

var db = new Sequelize('recipes', 'root', '', {
  dialect: 'mysql' //can be sqlite3
});

console.log('Our Database');

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



module.exports = db;
