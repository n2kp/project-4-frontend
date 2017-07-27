angular
.module('justo')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$scope', '$state', 'API_URL', '$auth', '$transitions', 'User', 'Conversation'];
function MainCtrl($rootScope, $scope, $state, API_URL, $auth, $transitions, User, Conversation) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;
  // console.log(vm);

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.errors.join('; ');
    // console.log(vm.message);

    if(err.status === 401 && vm.pageName !== 'login') {
      vm.stateHasChanged = false;
      $state.go('login');
    }
  });

  // Chat notifications
  vm.conversations = Conversation.query();

  function getUnread(currentUserId) {
    // vm.unreadMessages = 0;
    let count = 0;
    Conversation
    .query()
    .$promise
    .then((conversations) => {
      vm.unreadMessages = 0;
      conversations.forEach((conversation) => {
        conversation.messages.forEach((message) => {

          if (message.user_id !== currentUserId && !message.read) {
            return count += 1;
          }

        });

        vm.unreadMessages += count;
        count = 0;
        console.log('vm message', vm.unreadMessages);
      });
      return vm.unreadMessages;

    });
  }

  vm.getUnread = getUnread;


  /////////////////////////


  $scope.$on('child', (event, data) => {
    // console.log('received this', data); // 'Some data'
  });

  const protectedStates = ['projectsNew', 'projectsEdit', 'projectsShow', 'conversations'];

  $transitions.onSuccess({}, (transition) => {

    if($auth.getPayload()) {
      vm.currentUserPayload = $auth.getPayload();
      const id = vm.currentUserPayload.id;
      User
       .get({id: id})
       .$promise
       .then((payload) => {
         vm.currentUser = payload;
         // Always 0
         vm.unreadMessages = getUnread(id);
        //  console.log('VM Messages', vm.unreadMessages);
       });


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
