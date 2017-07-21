angular
.module('justo')
.config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'js/views/static/home.html'
  })
  .state('projectsIndex', {
    url: '/project',
    templateUrl: 'js/views/projects/index.html',
    controller: 'ProjectIndexCtrl as projectsIndex'
  })
  .state('projectsNew', {
    url: '/projects/new',
    templateUrl: 'js/views/projects/new.html',
    controller: 'ProjectNewCtrl as projectsNew'
  })
  .state('projectsShow', {
    url: '/projects/:id',
    templateUrl: 'js/views/projects/show.html',
    controller: 'ProjectShowCtrl as projectsShow'
  })
  .state('projectsEdit', {
    url: '/project/:id/edit',
    templateUrl: 'js/views/projects/edit.html',
    controller: 'ProjectEditCtrl as projectsEdit'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'js/views/auth/login.html',
    controller: 'AuthCtrl as auth'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'js/views/auth/register.html',
    controller: 'AuthCtrl as auth'
  });

  $urlRouterProvider.otherwise('/');
}
