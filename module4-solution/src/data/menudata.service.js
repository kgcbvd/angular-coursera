(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var service = this;

  service.getAllCategories = function () {
    return $http.get('https://davids-restaurant.herokuapp.com/categories.json')
  };

  service.getItemsForCategory = function(categoryShortName) {
    var url = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName;
    return $http.get(url)
  }
}
})();
