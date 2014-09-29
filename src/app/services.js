angular.module('toDo135.app')
  .factory('Bank', ['$http', '$q', 'Task', function($http, $q, Task) {
    function Bank() {
      var self = this,
        deferred = $q.defer();

      this.tasks = [];
      this.taskIndex = {};

      $http.get('/tasks/').then(
        function(response) {
          response.data.forEach(function(taskData) {
            self.tasks.push(new Task(taskData));
            self.taskIndex[taskData.id] = self.tasks[self.tasks.length - 1];
          });

          deferred.resolve(self);
        },
        function(response) {
          deferred.reject(response);
        }
      );

      return deferred.promise;
    }

    Bank.prototype.getTaskById = function(id) {
      return this.taskIndex[id];
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
  }])
  .factory('Day', ['$http', '$q', 'Bank', function($http, $q, Bank) {
    function Day() {
      var self = this;
        deferred = $q.defer();

      $http.get('/days/', { today: true }).then(
        function(response) {
          self.id = response.data[0].id;
          self.date = response.data[0].date;
          self.tasks = response.data[0].tasks.map(function(task) {
            return Bank.getTaskById(task.id);
          });

          deferred.resolve(self)
        },
        function(response) {
          deferred.reject(response);
        }
      );
    }

    return Day;
  }]);
