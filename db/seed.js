var mysql = require('./seedConfig.js');
var Sequelize = require('sequelize');
var data = require('./data/exampleData.js');
var db = require('./seedSchema.js')

//drop and create recipe database
mysql.createDatabase()
  .then(function() {

    //create tables and then sync
    db.createTables()
      .then(function() {

        //seed username
        db.User.create({
          username: 'UnicornKiller'
        })

        //seed recipes from data folder
        .then(() =>
        data.forEach(function(recipe) {
          db.Recipe.create(recipe, {
            include: [ db.Tag ]
          })
        }));
      })
  })
  .catch(console.error);
