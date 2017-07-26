angular
.module('justo')
.controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$auth', '$state', '$rootScope', 'User'];
function AuthCtrl($auth, $state, $rootScope, User) {
  const vm = this;
  vm.show = 1;
  function register() {
    $auth.signup(vm.user)
    .then(() => $state.go('login'));


    console.log(vm.user);

  }

  vm.register = register;

  function login() {
    $auth.login(vm.credentials)
    .then(() => {

      $state.go('projectsIndex');
    });
  }

  vm.login = login;

  // function authenticate(provider) {
  //   $auth.authenticate(provider)
  //   .then(() => $state.go('projectsIndex'));
  // }
  //
  // vm.authenticate = authenticate;

  function authenticate(provider) {
    $auth.authenticate(provider)
    .then((res) => {
      if ($auth.getPayload().is_dev === null) {
        // console.log('You must complete your profile', !user.is_dev);
        return $state.go('profileEdit', { id: id });
      } else {
        $state.go('projectsIndex');
      }

    });
  }
  vm.authenticate = authenticate;

}
