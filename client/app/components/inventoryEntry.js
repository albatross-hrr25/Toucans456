angular.module('app').component('inventoryEntry', {
  
  controller: 'InventoryEntryCtrl',
  templateUrl: 'views/inventoryEntry.html',
  bindings: {
    recipe: '<',
    onClick: '<'
  }

});

  //Checked KK