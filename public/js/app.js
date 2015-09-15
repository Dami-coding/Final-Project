angular
  .module('scavengerHunt', ['ngResource', 'ui.router', 'angular-jwt'])
  .config(MainRouter)

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('signup', {
      url: "/signup",
      templateUrl: "templates/home/signup.ejs"
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/home/login.ejs"
    })
    .state('home', {
      templateUrl: "templates/home/home.ejs",
      url: "/"
    })
    .state('newEvent', {
      url: "/events/new",
      templateUrl: "templates/events/new.ejs"
    })
    .state('newTask', {
      url: "/events/:hunt_id/tasks/new",
      templateUrl: "templates/tasks/new.ejs"
    })
    .state('showTask', {
      url: "/events/:hunt_id/tasks/:id",
      templateUrl: "templates/tasks/show.ejs"
    })
  
    .state('showHunt', {
      url: "/events/:id",
      templateUrl: "templates/events/show.ejs"
    })
    .state('indexHunt', {
      url: "/events",
      templateUrl: "templates/events/index.ejs"
    });

  $urlRouterProvider.otherwise("/");
}