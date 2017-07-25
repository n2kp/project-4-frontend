angular
.module('justo')
.controller('ProfileCtrl', ProfileCtrl)
.controller('ProfileEditCtrl', ProfileEditCtrl)
.controller('ConversationCtrl', ConversationCtrl);

ProfileCtrl.$inject = ['$auth', 'User', '$state', 'Review'];
function ProfileCtrl($auth, User, $state, Review) {
  const vm = this;

  vm.reviews = Review.query();
  vm.user = User.get($state.params);

  function logout() {
    $auth.logout();
    $state.go('login');
  }
  vm.logout = logout;

  vm.newReview = {};

  function addReview() {
    vm.newReview.receiver_id = vm.user.id;

    Review
    .save(vm.newReview)
    .$promise
    .then((newReview) => {
      vm.reviews.push(newReview);
    });
  }
  vm.addReview = addReview;

  function deleteReview(review) {
    Review
    .delete({ user_id: vm.user.id, id: review.id })
    .$promise
    .then(() => {
      const index = vm.user.reviews.indexOf(review);
      vm.user.reviews.splice(index, 1);
    });
  }
  vm.deleteReview = deleteReview;
}

ProfileEditCtrl.$inject = ['$auth', 'User','$state', '$scope', '$rootScope', 'API_URL','$http'];
function ProfileEditCtrl($auth, User, $state, $scope, $rootScope, API_URL, $http) {
  const vm = this;

  vm.user = User.get($state.params);
  vm.update = userUpdate;

  // $scope.$watch(vm.user.is_dev, () => {
  //   console.log('changed');
  //   // $rootScope.$broadcast('isDev', { isDev: vm.profile.is_dev });
  //   $scope.$emit('child', vm.user.is_dev);
  // });

  function userUpdate() {
    User
    .update($state.params, vm.user)
    .$promise
    .then(() => {

      $http.get(`${API_URL}/refresh`)
        .then((response) => {
          console.log(response);
          var refreshToken = response.data.token;
          $auth.setToken(refreshToken);
          $state.go('profile', $state.params);
        });
    });
  }
}

ConversationCtrl.$inject = ['Conversation', 'Message'];
function ConversationCtrl(Conversation, Message) {
  const vm = this;

  vm.conversations = Conversation.query();

  vm.message = {};
  vm.conversationId = null;
  vm.index = null;


  function addMessage() {
    vm.message.conversation_id = vm.conversationId;
    console.log(vm.message);
    Message
    .save({ id: vm.conversationId }, vm.message)
    .$promise
    .then((response) => {
      const message = response.conversation.messages.pop();
      vm.conversations[vm.index].messages.push(message);
      vm.message = {};
    });
  }

  function selectConversation(conversation, index) {
    Conversation
    .get({ id: conversation.id })
    .$promise
    .then((conversation) => {
      console.log(conversation);
      vm.conversationId = conversation.id;
      vm.index = index;

    });
  }

  vm.addMessage = addMessage;
  vm.selectConversation = selectConversation;
}
