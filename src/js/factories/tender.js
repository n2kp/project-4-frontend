angular
.module('justo')
.factory('Tender', Tender);

Tender.$inject = ['$resource', 'API_URL'];
function Tender($resource, API_URL) {
  return new $resource(`${API_URL}/tenders/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
