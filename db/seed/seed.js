var mysql = require('./seedConfig.js');
var Sequelize = require('sequelize');
var db = require('./seedSchema.js');
var seed = require('./seedData.js');

//drop and create recipe database
mysql.createDatabase()
  .then(function() {

    //create tables and then sync
    db.createTables()
      .then(function() {

        //upload seed data to tables
        seed.seedData()
          .then(function() {

            //close the connection
            db.db.close(); 
          })
      })
  })
