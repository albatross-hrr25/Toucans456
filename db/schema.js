var Sequelize = require('sequelize');

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
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: Sequelize.STRING,
  salt: Sequelize.INTEGER,
  hash: Sequelize.STRING
});

// create recipes table
var Recipe = db.define('Recipe', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  imageURl: Sequelize.STRING,
  title: Sequelize.STRING,
  isStarred: Sequelize.INTEGER,
  filename: Sequelize.STRING,
})

// create tags table
var Tag = db.define('Tag', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  tag: Sequelize.STRING,
})

Recipe.belongsTo(User);
Tag.belongsToMany(Recipe, {through: 'RecipeTag'});
Recipe.belongsToMany(Tag, {through: 'RecipeTag'});

db.sync();

// read the dummy data
// TODO: Turn this into a GET route
// User.findAll().then(data => {
//   console.log('findAll data: ', data[0].dataValues.username);
// });
module.exports = {
  db: db,
  User: User,
  Recipe: Recipe,
  Tag: Tag
}
