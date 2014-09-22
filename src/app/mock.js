angular.module('toDo135.mock', ['toDo135.app', 'ngMockE2E'])
  .config([function() {
  }])
  .run(['$httpBackend', function($httpBackend) {
    function generateTasks() {
      var tasks = [];

      for (var i = 0; i < 30; i ++) {
        tasks.push({
          title: 'Task ' + i,
          dueDate: new Date().valueOf() + 86400000 * Math.floor(Math.random() * 10),
          difficulty: Math.ceil(Math.random() * 3),
          description: 'Description for task ' + i,
          id: i
        })
      }

      return tasks;
    }

    $httpBackend.whenGET('/tasks/').respond(function() {
      return [200, generateTasks()];
    });

    $httpBackend.whenGET(/.+\.html/).passThrough();
  }]);
