angular.module('app')

.controller ('InventoryCtrl', function () {
  //console.log("inventory", this);
})

.component('inventory', {
  controller: 'InventoryCtrl',
  templateUrl: 'client/components/inventory/inventory.html',
  bindings: {
    recipes: '<',
    onClick: '<'
  }
})
