angular.module('app').controller('UploadRecipeCtrl',
  function ($scope, $timeout, mainService, Upload) {

  this.newRecipe = {};
  this.showFailModal = () => {
    $("#myModalfailed").modal('show');
  };

  this.showSuccessModal = () => {
    $("#myModalsuccess").modal('show');
  };


  this.handlePhotoSubmit = (file) => {
    //Retrieves all files from angular component
    var addedPhotos = angular.element(document.querySelector("#upload_field"))[0].files;

    //Retrieves all tags from angular component
    var addedTags = angular.element(document.getElementsByName("yolo"))[0].value;

    this.newRecipe["Tags"] = addedTags.split(",");
    this.newRecipe["Photos"] = addedPhotos;
    console.log("MEMEMEMEMEMEMEMEMMEMEMEME", this.newRecipe);
    var test = this.newRecipe

    console.log(file);
    file.upload = Upload.upload({
      url: '/upload',
      data: {file: file,
        newRecipe: test  
      }
    });

    file.upload.then(function (response) {
      console.log('success!', response);
      $scope.imageData = response.data;
    }, function(result) {
      console.log('error :(', result);
    });


    

    // if (!!this.newRecipe.Title && addedPhotos.length !== 0) {
    //   mainService.uploadFileToUrl(this.newRecipe, '/api/recipes');
    //   this.showSuccessModal();
    // } else {
    //   this.showFailModal();
    //   return false;
    // }

    $('#form_id').trigger("reset");
    $(".tm-input").tagsManager('empty');

  };


  $timeout(function () {
    // code to execute after directives goes here
    $(".tm-input").tagsManager({
      hiddenTagListName: "yolo"
    });
  });
});
