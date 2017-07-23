angular
.module('justo')
.factory('User', User)
.factory('Conversation', Conversation)
.factory('Message', Message);

User.$inject = ['$resource', 'API_URL'];
function User($resource, API_URL) {
  return new $resource(`${API_URL}/users/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

Conversation.$inject = ['$resource', 'API_URL'];
function Conversation($resource, API_URL) {
  return new $resource(`${API_URL}/conversations/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

Message.$inject = ['$resource', 'API_URL'];
function Message($resource, API_URL) {
  return new $resource(`${API_URL}/conversations/:id/messages`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
