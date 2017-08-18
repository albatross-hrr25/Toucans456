angular.module('app')
  .controller ('InventoryCtrl', function () {

  })
  .component('inventory', {

    controller: 'InventoryCtrl',
    templateUrl: 'client/components/inventory/inventory.html',
    bindings: {
      recipes: '<',
      onClick: '<'
    }

  });
