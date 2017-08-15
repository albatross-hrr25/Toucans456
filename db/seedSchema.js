var Sequelize = require('sequelize');

var db = new Sequelize('recipes', 'root', '', {
  dialect: 'mysql'
});

exports.createTables = function () {
  return new Promise(function(resolve, reject) {
    db.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');

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

      module.exports.User = User;
      module.exports.Recipe = Recipe;
      module.exports.Tag = Tag;
      module.exports.db = db;
      resolve();
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
      reject(err);
    });
  })
  .then(function() {
    return new Promise(function(resolve, reject) {
      db.sync()
        .then(() => {
          console.log('Syncing the database');
          resolve();
        })
        .catch(err => {
          console.error('Unable to sync:', err);
          reject(err);
        });
    });

  }).catch(err => {
    console.error('Sync was unsuccessful:', err);
  })
}
