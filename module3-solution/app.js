(function() {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems',FoundItems);

   function FoundItems(){
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          items: '<',
          onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: 'ctrl',
        bindToController: true
     };
     return ddo;
   };



  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.searchItems = function(searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function (response) {
        console.log("found");
        ctrl.found = response;
      })
      .catch(function (error) {
        console.log(error);
      })
    };
    ctrl.removeItem = function (itemIndex) {
      ctrl.found.splice(itemIndex, 1);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({method: "GET",url: ("https://davids-restaurant.herokuapp.com/menu_items.json")}
      ).then(function (result) {

        var foundItems = new Array();
        for ( var i = 0 ; i <  result.data.menu_items.length ; i++){
          result.data.menu_items[i].description
          if ( result.data.menu_items[i].description.indexOf(searchTerm) !== -1) {
            foundItems.push(result.data.menu_items[i])
          }
        }
        return foundItems;
      });
    };
  }

})();
