angular
.module('justo')
.controller('ProjectIndexCtrl', ProjectIndexCtrl)
// .controller('ProjectNewCtrl', ProjectNewCtrl)
.controller('ProjectShowCtrl', ProjectShowCtrl)
.controller('ProjectEditCtrl', ProjectEditCtrl);

ProjectIndexCtrl.$inject = ['Project'];
function ProjectIndexCtrl (Project) {
  const vm = this;
  vm.all = Project.query();
}







ProjectShowCtrl.$inject = ['Project', 'User', '$stateParams', '$state'];
function ProjectShowCtrl (Project, User, $stateParams){
  const vm = this;
  vm.project = Project.get($stateParams);

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
}
