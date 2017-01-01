(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuAppController', MenuAppController);

MenuAppController.$inject = ['allCategories'];
function MenuAppController(allCategories) {
  var mainCtrl = this;

  mainCtrl.allCategories = allCategories;
}

})();
