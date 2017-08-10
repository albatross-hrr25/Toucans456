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

// create users table
var User = db.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING,
  salt: Sequelize.INTEGER,
  hash: Sequelize.STRING
});

// make dummy table entry
// TODO: Turn this into a POST route
db.sync()
  .then(() => User.create({
    username: 'The Dude'
  }));

// read the dummy data
// TODO: Turn this into a GET route
User.findAll().then(data => {
  console.log('findAll data: ', data[0].dataValues.username);
});

module.exports = db;
