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

  const protectedStates = ['projectsNew', 'projectsEdit'];

  $transitions.onSuccess({}, (transition) => {
    if((!$auth.isAuthenticated() && protectedStates.includes(transition.$to().name))) {
      vm.message = 'You must be logged in to access this page.';
      return $state.go('login');
    }

    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) {
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
