(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuapp/templates/categoriesComponent.template.html',
  bindings: {
    allCategories: '<'
  }
});

})();
