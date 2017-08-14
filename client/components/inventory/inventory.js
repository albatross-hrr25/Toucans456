angular.module('app')

.controller ('InventoryTest', function () {
  this.user = 'inventory';
  console.log('InventoryTest controller has run: this is ', this);
})

.component('inventory', {
  controller: 'InventoryTest',
  templateUrl: 'client/components/inventory/inventory.html',
  bindings: {
    recipes: '<'
  }
})
