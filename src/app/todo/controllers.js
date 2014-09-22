angular.module('toDo135.app')
  .controller('BankCtrl', ['$scope', 'Bank', function($scope, Bank) {
    $scope.bank = Bank;
  }]);
