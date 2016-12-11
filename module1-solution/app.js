(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope']
  function LunchCheckController($scope) {
    $scope.returnMessage = function () {
      if (! $scope.list_lunch) {
        $scope.message = "Please enter data first";
        return;
      }
      var lists = $scope.list_lunch.split(',');
      if (lists.length <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
    }
    }
  }
})();
