angular.module('toDo135.app')
  .factory('Bank', ['$http', '$q', 'Task', function($http, $q, Task) {
    function Bank() {
      var self = this,
        deferred = $q.defer();

      this.tasks = [];

      $http.get('/tasks/').then(
        function(response) {
          response.data.forEach(function(taskData) {
            self.tasks.push(new Task(taskData));
          });

          deferred.resolve(self);
        },
        function(response) {
          deferred.reject(response);
        }
      );

      return deferred.promise;
    }

    return Bank;
  }])
  .factory('Task', ['$http', function($http) {
    function Task(taskData) {
      this.title = taskData.title;
      this.dueDate = new Date(taskData.dueDate);
      this.difficulty = taskData.difficulty;
      this.description = taskData.description;
      this.id = taskData.id;
    }

    return Task;
  }]);
