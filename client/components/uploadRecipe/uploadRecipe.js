angular.module('app')

.controller ('UploadRecipeCtrl', function ($scope, $timeout, get) {
  this.newRecipe = {};

  this.handlePhotoSubmit = () => {
    //Retrieves all files from angular component
    var addedPhotos = angular.element(document.querySelector("#upload_field"))[0].files;
    //console.log("addedPhotos", addedPhotos);

    //Retrieves all tags from angular component
    var addedTags = angular.element(document.getElementsByName("yolo"))[0].value;
    this.newRecipe["Tags"] = addedTags.split(",");
    this.newRecipe["Photos"] = addedPhotos;

    get.uploadFileToUrl(this.newRecipe, '/api/recipes')
  };

  $timeout(function() {
    // code to execute after directives goes here
    $(".tm-input").tagsManager(
       { hiddenTagListName:"yolo" }
      );
  });

})
.component('uploadRecipe', {
  controller: 'UploadRecipeCtrl',
  templateUrl: 'client/components/uploadRecipe/uploadRecipe.html',
});