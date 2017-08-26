angular.module('app').component('inventory', {

  controller: 'InventoryCtrl',
  templateUrl: 'views/inventory.html',
  bindings: {
    recipes: '<',
    onClick: '<'
  }

});


  //Checked KK