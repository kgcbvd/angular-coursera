(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', foundItemsDirective)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var list = this;
        list.searchTerm = "";
        list.found = [];
        list.search = function() {
            var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

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
        list.removeItem = function (itemIndex) {
            console.log(itemIndex);
            MenuSearchService.removeItem(itemIndex);
        };
    };

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath){
        var service = this;
        var foundItemsList = [];
        service.getMatchedMenuItems = function(searchTerm) {
            foundItemsList = [];
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
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
