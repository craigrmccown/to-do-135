angular.module('toDo135.config', [])
  .config(['$httpProvider', function($httpProvider) {
    var path = 'http://10.0.1.6:9292'

    $httpProvider.interceptors.push(function() {
      return {
        'request': function(config) {
          if (!config.url.match(/.+\.html/)) {
            config.url = path + config.url;
          }
          return config;
        }
      };
    });
  }]);
