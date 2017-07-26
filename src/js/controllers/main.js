angular
.module('justo')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$scope', '$state', 'API_URL', '$auth', '$transitions', 'User'];
function MainCtrl($rootScope, $scope, $state, API_URL, $auth, $transitions, User) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;
  console.log(vm);

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.errors.join('; ');
    console.log(vm.message);

    if(err.status === 401 && vm.pageName !== 'login') {
      vm.stateHasChanged = false;
      $state.go('login');
    }
  });

  // $rootScope.$on('isDev', (e, data) => {
  //   console.log(data.isDev);
  // });

  $scope.$on('child', (event, data) => {
    console.log('received this', data); // 'Some data'
  });

  const protectedStates = ['projectsNew', 'projectsEdit', 'projectsShow'];

  $transitions.onSuccess({}, (transition) => {

    // console.log($rootScope);

    if($auth.getPayload()) {
      vm.currentUserPayload = $auth.getPayload();
      const id = vm.currentUserPayload.id;
      vm.currentUser = User.get({id: id});

      if($auth.getPayload() && $auth.getPayload().is_dev === undefined) {
        vm.message = 'Fill in your profile.';
        return $state.go('profileEdit', { id: vm.currentUserPayload.id });
      }
    }

    if((!$auth.isAuthenticated() && protectedStates.includes(transition.$to().name))) {
      vm.message = 'You must be logged in to access this page.';
      return $state.go('login');
    }

    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;

    vm.pageName = transition.$to().name;
    vm.isHome = vm.pageName === 'home';
  });

  function logout() {
    $auth.logout();
    $state.go('/');
  }

  vm.logout = logout;
}
