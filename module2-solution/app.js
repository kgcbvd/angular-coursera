(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var buy = this;
  buy.items = ShoppingListCheckOffService.GetItemsToBuy();
  buy.buyItem = function(index) {
    ShoppingListCheckOffService.buyItem(index);
  };
};

function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.GetBoughtItems();
};

function ShoppingListCheckOffService() {
  var service = this;
  var boughtItems = [];
  var toBuyItems = [
      { name: "meat", quantity: 4 },
      { name: "chocolate", quantity: 12 },
      { name: "cookies", quantity: 15},
      { name: "cola", quantity: 2 },
      { name: "milk", quantity: 5 }
  ];

  service.GetItemsToBuy = function() {
    return toBuyItems;
  };

  service.GetBoughtItems = function() {
    return boughtItems;
  };

  service.buyItem = function(itemIndex) {
    var item = toBuyItems[itemIndex];
    boughtItems.push(item);
    toBuyItems.splice(itemIndex, 1);
  };
};

})();
