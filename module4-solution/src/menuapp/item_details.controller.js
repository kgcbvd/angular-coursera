(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailsController', ItemDetailsController);

ItemDetailsController.$inject = ['items'];
function ItemDetailsController(items) {
  var detailsCtrl = this;

  detailsCtrl.items = items;
}

})();
