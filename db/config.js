var Sequelize = require('sequelize');

console.log('config.js has been served');

var db = new Sequelize('recipes', 'root', '', {
  dialect: 'mysql' //can be sqlite3
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// create dummy table
var User = db.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING,
  salt: Sequelize.INTEGER,
  hash: Sequelize.STRING
})

module.exports = db;
