angular.module('movieApp.services', []).factory('Movie', function($resource) {
  return $resource('http://localhost:5000/movies/', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});