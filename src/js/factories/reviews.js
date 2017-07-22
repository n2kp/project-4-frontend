angular
.module('justo')
.factory('Review', Review);

Review.$inject = ['$resource', 'API_URL'];
function Review($resource, API_URL) {
  return new $resource(`${API_URL}/reviews/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
