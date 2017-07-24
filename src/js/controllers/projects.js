angular
.module('justo')
.controller('ProjectIndexCtrl', ProjectIndexCtrl)
.controller('ProjectNewCtrl', ProjectNewCtrl)
.controller('ProjectShowCtrl', ProjectShowCtrl)
.controller('ProjectEditCtrl', ProjectEditCtrl);

ProjectIndexCtrl.$inject = ['Project', 'moment'];
function ProjectIndexCtrl (Project, moment) {
  const vm = this;
  vm.all = Project.query();
  moment().hour(8).minute(0).second(0).toDate();
}


ProjectNewCtrl.$inject = ['Project', 'User', '$stateParams', '$state'];
function ProjectNewCtrl (Project, User, $stateParams, $state ){
  const vm = this;
  vm.project = {};
  vm.users = User.query();


  const today = new Date();
  vm.today = today.toISOString();


  function projectsCreate() {
    Project
    .save(vm.project)
    .$promise
    .then(() =>
    $state.go('projectsIndex'));
  }
  vm.create = projectsCreate;
}


ProjectShowCtrl.$inject = ['Project', 'User', '$stateParams', '$state', 'Conversation', 'Tender', 'moment'];
function ProjectShowCtrl (Project, User, $stateParams, $state, Conversation, Tender, moment) {
  const vm = this;
  moment().hour(8).minute(0).second(0).toDate();

  vm.project = Project.get($stateParams);
  vm.tenders = Tender.query();

  vm.tender = {};

  function addTender() {
    vm.tender.project_id = vm.project.id;
    Tender
    .save(vm.tender)
    .$promise
    .then((tender) => {
      vm.tenders.push(tender);
    });
  }

  // function tenderUpdate() {
  //   Tender
  //   .update({ id: vm.tender.id }, vm.tender)
  //   .$promise
  //   .then(() =>  );
  // }
  // vm.update = tenderUpdate;


  function tendersDelete(tender) {
    Tender
    .delete({ id: tender.id })
    .$promise
    .then(() => {
      const index = vm.project.tenders.indexOf(tender);
      vm.project.tenders.splice(index, 1);
    });
  }
  vm.delete = tendersDelete;



  function findUsersTender(id) {
    if (!vm.project.tenders) return false;
    const arrayOfTenders = vm.project.tenders.map((tender) => {
      return tender.user.id === id;
    });
    return arrayOfTenders.includes(true);
  }
  vm.findUsersTender = findUsersTender;
  vm.tenderCreate = addTender;



  function contactCreator(sender_id, receiver_id) {
    Conversation
    .save({ sender_id, receiver_id })
    .$promise
    .then(() => {
      $state.go('conversations');
    });
  }

  vm.contactCreator = contactCreator;
}



ProjectEditCtrl.$inject = ['Project', 'User', '$stateParams', '$state'];
function ProjectEditCtrl (Project, User, $stateParams, $state) {
  const vm = this;

  Project.get($stateParams)
  .$promise
  .then((project) => {
    vm.project = project;
    vm.project.project_deadline = new Date(project.project_deadline);
    vm.project.bid_deadline = new Date(project.bid_deadline);
  });

  function projectUpdate() {
    Project
    .update({ id: vm.project.id }, vm.project)
    .$promise
    .then(() =>
    $state.go('projectsShow', { id: vm.project.id }));
  }
  vm.update = projectUpdate;

  function projectsDelete() {
    vm.project
    .$remove()
    .then(() => $state.go('projectsIndex'));
  }

  vm.delete = projectsDelete;
}
