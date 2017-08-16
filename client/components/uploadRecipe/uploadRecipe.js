angular.module('app')

.controller ('UploadRecipeCtrl', function ($scope, get) {
  // console.log($scope.tm-input)
  // $(".tm-input").tagsManager();
})

.component('uploadRecipe', {
  controller: 'UploadRecipeCtrl',
  templateUrl: 'client/components/uploadRecipe/uploadRecipe.html',

})