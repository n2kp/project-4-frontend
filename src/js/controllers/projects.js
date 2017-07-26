angular
.module('justo')
.controller('ProjectIndexCtrl', ProjectIndexCtrl)
.controller('ProjectNewCtrl', ProjectNewCtrl)
.controller('ProjectShowCtrl', ProjectShowCtrl)
.controller('ProjectEditCtrl', ProjectEditCtrl);

ProjectIndexCtrl.$inject = ['Project', 'moment', 'filterFilter', '$scope', 'orderByFilter'];
function ProjectIndexCtrl (Project, moment, filterFilter, $scope) {
  const vm = this;
  vm.all = [];

  Project.query()
  .$promise
  .then((projects) => {
    vm.all = projects;
    filterProjects();
  });

  moment().hour(8).minute(0).second(0).toDate();


  function filterProjects() {
    const params = { title: vm.q };

    if(vm.useBudget) params.budget = vm.budget;
    if(vm.useDeadline) params.deadline = vm.bid_deadline;

    vm.filtered = filterFilter(vm.all, params);

  }

  function lowerThan(prop, val){
    if(vm.useBudget) {
      return function(project) {
        if (project[prop] < val || project[prop] === undefined) return true;
      };
    }
  }
  vm.lowerThan = lowerThan;

  function dateFilter(prop, val) {
    if(vm.useDeadline) {
      return function(project) {
        const chosenEndDate = moment().add(val, 'day')._d;
        const bidEndDate = moment(project[prop])._d;
        if (chosenEndDate > bidEndDate) return true;
      };
    }
  }

  vm.dateFilter = dateFilter;

  //create a watch group to listen out for changes and then running the function
  $scope.$watchGroup([
    () => vm.q,
    () => vm.lowerThan,
    () => vm.dateFilter
  ], filterProjects);
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
    .then((project) => {

      $state.go('projectsShow', { id: project.id });
    });
  }
  vm.create = projectsCreate;
}


ProjectShowCtrl.$inject = ['Project', 'User', '$stateParams', '$state', 'Conversation', 'Tender', 'moment'];
function ProjectShowCtrl (Project, User, $stateParams, $state, Conversation, Tender, moment) {
  const vm = this;
  moment().hour(0).minute(0).second(0).toDate();

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
      $state.go('projectsIndex');
    });
  }

  function tenderUpdate() {
    Tender
    .update({ id: vm.tender.id }, vm.tender)
    .$promise
    .then(()=> {
      $state.go('projectsIndex');
    });
  }
  vm.tenderUpdate = tenderUpdate;


  function acceptBid(id) {
    vm.project.tenders.map((tender) => {
      if (tender.id === id) {
        tender.status = 'accepted';
        Tender.update({ id: tender.id }, tender);
      } else {
        tender.status = 'rejected';
        Tender.update({ id: tender.id }, tender);
      }
    });
    vm.project.is_active = false;
    Project.update({ id: vm.project.id }, vm.project);
  }
  vm.acceptBid = acceptBid;


  function rejectBid(id) {
    vm.project.tenders.map((tender) => {
      if (tender.id === id) {
        tender.status = 'rejected';
        Tender.update({ id: tender.id }, tender);
      }
    });
  }

  vm.rejectBid = rejectBid;


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
