(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  $scope.message          = "";
  $scope.countBlankItems  = true;
  $scope.totalItems       = undefined;
  $scope.listItems        = "";

  // Handlers
  $scope.getValidClass    = getValidClass;
  $scope.checkMyList      = checkMyList;


  // Private methods
  function checkMyList () {
    if ($scope.countBlankItems) {
      $scope.totalItems = countWithBlanks();
    } else {
      $scope.totalItems = countWithoutBlanks();
    }
    $scope.message = giveAMessage($scope.totalItems);
  }

  function countWithBlanks() {
    var list = $scope.listItems.trim();
    if (list == '') {
      return 0;
    } else {
      var items = list.split(',');
      return items.length;
    }
  }

  function countWithoutBlanks() {
    var list = $scope.listItems.trim();
    if (list == '') {
      return 0;
    } else {
      var items = list.split(',');
      for (var i = items.length - 1; i > -1 ; i--) {
        if (items[i].trim() == '') {
          items.splice(i,1);
        }
      }
      return items.length;
    }
  }

  function giveAMessage(itemsCount) {
    var message = 'Too much!'; // Default message
    if (itemsCount == 0) {
      message = 'Please enter data first';
    } else if (itemsCount < 4) {
      message = 'Enjoy!';
    }
    return message;
  }

  function getValidClass(classType) {
    var color = getColor();
    if (!!color) {
      return color + '-' + classType;
    } else {
      return '';
    }
  }

  function getColor() {
    if ($scope.totalItems > 0) {
      return 'green';
    } else if ($scope.totalItems == 0) {
      return 'red';
    } else {
      return undefined;
    } 
  }
};

})();
