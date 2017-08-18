angular.module('app')
  .controller ('InventoryCtrl', function () {

  })
  .component('inventory', {

    controller: 'InventoryCtrl',
    templateUrl: 'templates/inventory.html',
    bindings: {
      recipes: '<',
      onClick: '<'
    }

  });
