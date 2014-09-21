angular.module('toDo135.mock', ['toDo135.app', 'ngMockE2E'])
  .config([function() {
  }])
  .run(['$httpBackend', function($httpBackend) {
    $httpBackend.whenGET(/.+\.html/).passThrough();
  }]);
