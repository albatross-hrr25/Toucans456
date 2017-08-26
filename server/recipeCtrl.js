const app = require('../index.js');
const db = require('../db/schema.js');

// Finds all recipes from the database
exports.findRecipes = (request, response) => {
  //STRETCH GOAL:  Account for username here
  //query username to retrieve their recipeId's
  db.Recipe.findAll()
    .then((recipe) => {
      //console.log(recipe);
      response.send(recipe);
    })
    .catch((error) => {
      response.send(error);
    });
};

//Returns all data associated with the recipe that was clicked on
exports.getRecipeData = (request, response) => {
  console.log('Server GET Recipes request', typeof request.query.config);
  var responseObj = {};
  var queryStringPhoto = "SELECT Image FROM Photos WHERE RecipeId = " + request.query.config;
  var queryStringTag = "SELECT Tag FROM Tags LEFT JOIN RecipeTag on RecipeTag.tagId = tags.id WHERE RecipeTag.RecipeId = " + request.query.config;
  var queryStringTitleAndStars = "SELECT title, isStarred FROM Recipes WHERE id = " + request.query.config;

  return new Promise(function(resolve, reject) {
    db.db.query(queryStringPhoto)
    .spread(function(photos) {
      responseObj["Photos"] = photos;   //[array of photos]
      db.db.query(queryStringTag)
      .spread(function(tags) {
        responseObj["Tags"] = tags;   //[array of tags]
        db.db.query(queryStringTitleAndStars)
        .spread(function(titleAndStars) {
          responseObj["title"] = titleAndStars[0].title;
          responseObj["isStarred"] = titleAndStars[0].isStarred;
          resolve();
        });
      });
    });
   })
  .then(function() {
    response.send(responseObj);
  })
  .catch(function(error) {
    console.log('Server GET photos error');
    response.send(error);
  });
};


// Adds a recipe, desired tags, thumbnail url, and photos to the database
exports.addRecipe = (request, response) => {
  //UPDATE THIS TO HANDLE USERNAME
  var photoPathforOne = request.files[0].path;
  var photoTitle = request.body.title + "thumbnail";
  var photoTags = request.body.tags.split(",");
  var photoData = request.files;
  var endThisResponse = response;

  return new Promise(function(resolve, reject){
    cloudConfig.uploadPhoto(photoPathforOne, photoTitle, photoTags)
    .then(function(response){
      var inputTags = photoTags.map(cur => cur={tag:cur});
      db.Recipe.create({
        title: request.body.title,
        imageUrl: response.secure_url,
        Tags: inputTags
      }, {
        include: [db.Tag]  //UPDATE THIS TO HANDLE USERNAME
      })
      .then(() => {
        console.log('Server POST Recipe success');

      })
      .catch((error) => {
        console.log('Server POST Recipe error');
        response.send(error);
      });
      resolve();
    })
    .catch(err => {
      console.error('Unable to upload', err);
      reject(err);
    });
  })
  .then(function() {
    photoData.forEach(function(cur, index){
      var photoPath = cur.path;
      var photoTitle = request.body.title + index;
      var receivedUrl ='';
      return new Promise(function(resolve, reject) {
        cloudConfig.uploadPhoto(photoPath, photoTitle)
        .then(function(response){
          receivedUrl = response.secure_url;
          db.Recipe.findOne({where: {title: request.body.title}})
          .then(recipe =>(

            db.Photo.create({
              RecipeId: recipe.id,
              image:receivedUrl
            })
            .then((recipeData) => {
              console.log('Server POST Recipe success', recipeData);
              endThisResponse.send(recipeData);
            })
            .catch((error) => {
              console.log('Server POST Recipe error: ', error);
              endThisResponse.end('Recipe upload error');
            })
          ));
        });
      });
    });

  })
  .catch(err => console.error);
};

// Deletes a recipe from the database
exports.removeRecipe = (request, response) => {
  db.Recipe.findAll({ title: request.body.title }) //use findAll here?
    .then((recipe)=> {
      console.log('Recipes is: ', recipes);
      return recipes[0].destroy();
    })
    .then(() => {
      console.log('Recipe DESTROYED.');
    });
};