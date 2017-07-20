angular
  .module('finalProject')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', 'API_URL'];
function MainCtrl($http, API_URL) {
  const vm = this;

  $http({
    method: 'GET',
    url: `${API_URL}/users`
  })
  .then((res) => vm.users = res.data);
  
}