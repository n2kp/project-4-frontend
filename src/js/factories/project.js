angular
.module('justo')
.factory('Project', Project);

Project.$inject = ['$resource', 'API_URL'];
function Project($resource, API_URL) {
  return new $resource(`${API_URL}/projects/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
