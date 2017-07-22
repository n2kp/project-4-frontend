angular
.module('justo')
.controller('ProfileCtrl', ProfileCtrl)
.controller('EditProfileCtrl', EditProfileCtrl);

ProfileCtrl.$inject = ['$auth', 'User', '$state', 'Review'];
function ProfileCtrl($auth, User, $state, Review) {
  const vm = this;

  // vm.user = User.query($state.params);


  vm.user = User.get($state.params);

  function logout() {
    $auth.logout();
    $state.go('login');
  }
  vm.logout = logout;

  vm.newReview = {};

  function addReview() {
    Review
    .save({ user_id: vm.user.id }, vm.newReview)
    .$promise
    .then((review) => {
      vm.user.reviews.push(review);
      vm.newReview = {};
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

EditProfileCtrl.$inject = ['$auth', 'User','$state'];
function EditProfileCtrl($auth, User, $state) {
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
