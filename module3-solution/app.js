(function () {
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',foundItems);


//------------ Directive ------------//
function foundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '=',
    },
    controller: NarrowItDownController,
    bindToController: true,
    controllerAs:  'NarrowItDown',
  };
  return ddo;
};


//------------ Controller ------------//
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var NarrowItDown = this;
  NarrowItDown.searchTerm = "";

  NarrowItDown.searchIt = function(){
    if(NarrowItDown.searchTerm.length != 0){
      var promise = MenuSearchService.getMatchedMenuItems(NarrowItDown.searchTerm);
      promise.then(function(response){
        NarrowItDown.found = response;
      });
    }else{
      NarrowItDown.found = [];
    }
  };

  NarrowItDown.remove = function(index){
    NarrowItDown.found = MenuSearchService.removeItem(NarrowItDown.found, index);
  }
}


//------------ Service ------------//
MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
      var found = $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
      })
      .then(function success(response){
        var foundTmp = [];
        for(var i=0; i< response.data.menu_items.length; i++){
          var tmp = response.data.menu_items[i];
          if(tmp.description.toLowerCase().indexOf(searchTerm) !== -1 ||
          tmp.name.toLowerCase().indexOf(searchTerm) !== -1){
            foundTmp.push(tmp);
          };
        }
        return foundTmp;
      },
      function error(response){
        console.log(response);
      });
      return found;
    };

  service.removeItem = function(objArray, index){
    objArray.splice(index,1);
    return objArray;
  };
}

})();
