var db = require('./seedSchema.js');
var data = require('./../data/exampleData.js');

//seed username

exports.seedData = function () {
  return new Promise(function(resolve, reject) {
    db.User.create({  //POSSIBLY SEED ALL USERS HERE
      username: 'UnicornKiller',
      hash: 'password'
    })
    .then(function() {
      console.log('Seeding username');
      resolve();
    })
    .catch(err => {
      console.error('Unable to seed username', err);
      reject(err);
    });
  })
  .then(function() {
    return new Promise(function(resolve, reject) {
      data.forEach(function(recipe) {
        db.Recipe.create({
          title: recipe.title,
          imageUrl: recipe.imageUrl,
          Photos: recipe.Photos,
          isStarred: recipe.isStarred,
          Tags: recipe.Tags,
          ///User: recipe.user,
         }, {
           include: [db.Tag, db.Photo]  //RETHINK THIS!!!!!! User
        })
        .then(function() {
          console.log('Recipe saved');
          resolve();
        })
        .catch(err => {
          console.error('Unable to seed recipe', err);
          reject(err);
        })
      })


    });
  })
  .catch(err => {
    console.error('Seeding was unsuccessful:', err);
  })
}
