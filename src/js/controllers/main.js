angular
.module('justo')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', 'API_URL', '$auth', '$transitions'];
function MainCtrl($rootScope, $state, API_URL, $auth, $transitions) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;
  console.log(vm);
  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.errors.join('; ');

    if(err.status === 401 && vm.pageName !== 'login') {
      vm.stateHasChanged = false;
      $state.go('login');
    }
  });

  var justo = angular.module('materializeApp', ['ui.materialize'])
  .controller('BodyController', ['$scope', function ($scope) {
    $scope.select = {
      value: 'Option1',
      choices: ['Option1', 'an option', 'This is materialize', 'No, this is Patrick.']
    };
  }]);

  const protectedStates = ['projectsNew', 'projectsEdit'];

  $transitions.onSuccess({}, (transition) => {
    if((!$auth.isAuthenticated() && protectedStates.includes(transition.$to().name))) {
      vm.message = 'You must be logged in to access this page.';
      return $state.go('login');
    }

    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) {
      // console.log($auth.getPayload());
      vm.currentUser = $auth.getPayload().id;
    }
    vm.pageName = transition.$to().name;
  });

  function logout() {
    $auth.logout();
    $state.go('/');
  }

  vm.logout = logout;
}
