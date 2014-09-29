angular.module('toDo135.config', [])
  .config(['$httpProvider', function($httpProvider) {
    var path = ''

    $httpProvider.interceptors.push(function() {
      return {
        'request': function(config) {
          config.url = path + config.url;
          return config;
        }
      };
    });
  }]);
