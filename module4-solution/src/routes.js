(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })
  .state('categoriesList', {
    url: '/categoriesList',
    templateUrl: 'src/menuapp/templates/categoriesList.template.html',
    controller: 'MenuAppController as mainCtrl',
    resolve: {
      allCategories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories().then(function (response) {
          return response.data;
        });
      }]
    }
  }).
  state('categoryItems', {
    url: '/category-items/{itemId}',
    templateUrl: 'src/menuapp/templates/categoryItem.template.html',
    controller: 'ItemDetailsController as detailsCtrl',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
        function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.itemId)
            .then(function (response) {
              return response.data.menu_items;
            });
        }]
    }
  })
}
})();
