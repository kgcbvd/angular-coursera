(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nwctrl = this;
  nwctrl.searchTerm = "";
  nwctrl.found = [];
  nwctrl.search = function() {
      var promise = MenuSearchService.getMatchedMenuItems(nwctrl.searchTerm);

      promise.then(function(response) {
              if(!response.length)
                  list.found = 0;
              else
                  list.found = response;
          })
          .catch(function(error) {
              console.log(error);
          })
  };
  nwctrl.removeItem = function (itemIndex) {
      console.log(itemIndex);
      MenuSearchService.removeItem(itemIndex);
  };
};

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
        var service = this;
        var foundItemsList = [];
        service.getMatchedMenuItems = function(searchTerm) {
            foundItemsList = [];
            return $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function(result) {

                for (var key in result.data.menu_items) {
                    if (result.data.menu_items[key].description.search(searchTerm) != -1 && searchTerm != "") {
                        foundItemsList.push(result.data.menu_items[key]);
                    }
                }
                return foundItemsList;
            });
        };
        service.removeItem = function (itemIndex) {
          foundItemsList.splice(itemIndex, 1);
        };
    }

    function foundItemsDirective(){
        var ddo = {
            templateUrl:'foundItems.html',
            scope: {
               items: '<',
               onRemove: '&'
            }
        };
    return ddo;
  };
})();
