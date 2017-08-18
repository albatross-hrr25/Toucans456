angular.module('app')
  .controller ('UploadRecipeCtrl', function ($scope, $timeout, get) {

    this.newRecipe = {};


    this.handlePhotoSubmit = () => {
      //Retrieves all files from angular component
      var addedPhotos = angular.element(document.querySelector("#upload_field"))[0].files;

<<<<<<< HEAD
      //Retrieves all tags from angular component
      var addedTags = angular.element(document.getElementsByName("yolo"))[0].value;
      this.newRecipe["Tags"] = addedTags.split(",");
      this.newRecipe["Photos"] = addedPhotos;

    if(!!this.newRecipe.Title && addedPhotos.length !==0) {
      get.uploadFileToUrl(this.newRecipe, '/api/recipes')
    } else {
      alert('Recipe Title and file are required');
      return false;
    }

  };
=======
    get.uploadFileToUrl(this.newRecipe, '/api/recipes');

    $('#form_id').trigger("reset");
    $(".tm-input").tagsManager('empty');
  };

  $timeout(function() {
    // code to execute after directives goes here
    $(".tm-input").tagsManager(
       { hiddenTagListName:"yolo"}
      );
>>>>>>> Update reset form once submmit

    $timeout(function() {
      // code to execute after directives goes here
      $(".tm-input").tagsManager(
         { hiddenTagListName:"yolo" }
        );
    });
  })
  .component('uploadRecipe', {
    controller: 'UploadRecipeCtrl',
    templateUrl: 'templates/uploadRecipe.html',

  });
