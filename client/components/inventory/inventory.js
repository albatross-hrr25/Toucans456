angular.module('app')
  .controller ('InventoryCtrl', function () {

  })
  .component('inventory', {

    controller: 'InventoryCtrl',
    templateUrl: 'components/inventory/inventory.html',
    bindings: {
      recipes: '<',
      onClick: '<'
    }

  });
