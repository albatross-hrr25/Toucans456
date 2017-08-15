var db = require('./seedSchema.js');
var data = require('./data/exampleData.js');

//seed username

exports.seedData = function () {
  return new Promise(function(resolve, reject) {
    db.User.create({
      username: 'UnicornKiller'
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
      db.Recipe.bulkCreate(data)
      .then(function() {
        console.log('Recipes seeded');
        resolve();
      })
      .catch(err => {
        console.error('Unable to seed recipe', err);
        reject(err);
      })
    });
  }).catch(err => {
    console.error('Seeding was unsuccessful:', err);
  })
}
