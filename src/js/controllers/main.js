angular
.module('justo')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', 'API_URL', '$auth', '$transitions','User'];
function MainCtrl($rootScope, $state, API_URL, $auth, $transitions, User) {
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
      vm.users = User.query()
      .$promise
      .then((user) =>{
        console.log(user);
        vm.currentUser = $auth.getPayload();
        // const currentId = vm.currentUserId.id;
        // console.log();
        // console.log(currentId);
        vm.currentUser = user[Number(vm.currentUser.id)];
        console.log(vm.currentUser);
      });

    }
    vm.pageName = transition.$to().name;
    vm.isHome = vm.pageName === 'home';
  });

  function logout() {
    $auth.logout();
    $state.go('/');
  }

  vm.logout = logout;
}
