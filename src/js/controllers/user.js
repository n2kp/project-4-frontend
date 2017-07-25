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

ProfileEditCtrl.$inject = ['$auth', 'User','$state'];
function ProfileEditCtrl($auth, User, $state) {
  const vm = this;

  vm.user = User.get($state.params);
  vm.update = userUpdate;

  function userUpdate() {
    User
    .update($state.params, vm.user)
    .$promise
    .then(() => {
      $state.go('profile', $state.params);
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

    Message
    .save({ id: vm.conversationId }, vm.message)
    .$promise
    .then((response) => {
      console.log(response);
      const newMessage = response.conversation.messages.pop();
      vm.conversations[vm.index].messages.push(newMessage);
      vm.message = {};
    });
  }

  function getUnread(currentUserId) {
    let count = 0;
    vm.conversations.forEach((conversation) => {
      return conversation.messages.map((message) => {
        if (message.user_id !== currentUserId && !message.read) {
          return count += 1;
        }
        console.log('Count: ', count);
      });
    });

  }

  vm.getUnread = getUnread;

  function selectConversation(conversation, index, currentUserId) {

    conversation.messages.forEach((message) => {
      if (message.user_id !== currentUserId) {
        message.read = true;
      }
    });

    console.log(conversation.messages);
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
