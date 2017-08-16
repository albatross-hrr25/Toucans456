angular.module('app')

.controller ('UploadRecipeCtrl', function (get) {
  // console.log($scope.tm-input)
  // $(".tm-input").tagsManager();
  this.newRecipe = {};

  this.handlePhotoSubmit = () => {
    var x = angular.element(document.getElementsByName("yolo"))[0].value;
    this.newRecipe["tags"] = x.split(",");
    console.log(this.newRecipe);
  };

})

.component('uploadRecipe', {
  controller: 'UploadRecipeCtrl',
  templateUrl: 'client/components/uploadRecipe/uploadRecipe.html',

})