angular.module('toDo135.app', ['toDo135.config', 'ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('app', {
        templateUrl: '/app/views/app.html',
        abstract: true,
        controller: 'AppCtrl'
      })
      .state('app.todo', {
        views: {
          'bank': {
            templateUrl: '/app/todo/views/bank.html',
            resolve: {
              'Bank': function(Bank) {
                return new Bank();
              },
              'Day': function(Day) {
                // return new Day();
              }
            },
            controller: 'BankCtrl'
          },
          'day': {
            templateUrl: '/app/todo/views/day.html'
          }
        }
      })
  }])
  .run(['$state', '$rootScope', function($state, $rootScope) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      console.log('state change error.');
      console.log(error);
    });

    $state.go('app.todo');
  }])
  .controller('AppCtrl', [function() {
    
  }]);
