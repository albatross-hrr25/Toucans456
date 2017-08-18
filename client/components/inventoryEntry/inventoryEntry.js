angular.module('app')
  .controller ('InventoryEntryCtrl', function () {

  })
  .component('inventoryEntry', {

    controller: 'InventoryEntryCtrl',
    templateUrl: 'client/components/inventoryEntry/inventoryEntry.html',
    bindings: {
      recipe: '<',
      onClick:'<'
    }

  });
