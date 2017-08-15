var mysql = require('./seedConfig.js');
var Sequelize = require('sequelize');
var data = require('./data/exampleData.js');
var db = require('./seedSchema.js')

mysql.createDatabase()
  .then(function() {
    console.log('error 1')
    db.createTables()
      .then(function() {
        //console.log('is the error here?', db.db.sync);
        db.User.create({
          username: 'UnicornKiller'
        })
        .then(() =>
        data.forEach(function(recipe) {
          db.Recipe.create(recipe, {
            include: [ db.Tag ]
          })
        }));

      })
  })
  .catch(console.error);


  // db.sync()
  //   .then(() => db.User.create({
  //     username: 'UnicornKiller'
  //   }))
  //   .then(() =>
  //   data.forEach(function(recipe) {
  //     db.Recipe.create(recipe, {
  //       include: [ Tag ]
  //     })
  //   }));
