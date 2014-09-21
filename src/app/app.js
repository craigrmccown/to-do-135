angular.module('toDo135.app', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app', {
        templateUrl: '/app/views/app.html',
        controller: 'AppCtrl',
        abstract: true
      })
      .state('app.todo', {
        views: {
          'bank': {
            templateUrl: '/app/todo/views/bank.html',
          },
          'day': {
            templateUrl: '/app/todo/views/day.html'
          }
        }
      })
  }])
  .run(['$state', function($state) {
    $state.go('app.todo');
  }])
  .controller('AppCtrl', [function() {

  }]);
