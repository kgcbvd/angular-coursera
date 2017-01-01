(function () {
'use strict';

angular.module('MenuApp')
.component('categoryItems', {
  templateUrl: 'src/menuapp/templates/itemsComponent.template.html',
  bindings: {
    items: '<'
  }
});

})();
