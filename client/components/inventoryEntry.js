angular.module('app')
  .controller ('InventoryEntryCtrl', function () {

  })
  .component('inventoryEntry', {

    controller: 'InventoryEntryCtrl',
    templateUrl: 'templates/inventoryEntry.html',
    bindings: {
      recipe: '<',
      onClick:'<'
    }

  });
