angular
.module('justo')
.controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$auth', '$state'];
function AuthCtrl($auth, $state) {
  const vm = this;

  function register() {
    $auth.signup(vm.user)
    .then(() => $state.go('login') );

  }

  vm.register = register;

  function login() {
    $auth.login(vm.credentials)
    .then(() => $state.go('projectsIndex'));
  }

  vm.login = login;
}
