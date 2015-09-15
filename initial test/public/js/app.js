angular
  .module('scavengerHunt', ['ngResource', 'ui.router', 'angular-jwt'])
  .config(MainRouter)

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('signup', {
      url: "/signup",
      templateUrl: "templates/homepage/signup.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/homepage/login.html"
    })
    .state('homepage', {
      templateUrl: "templates/homepage/homepage.html",
      url: "/"
    })
    .state('newHunt', {
      url: "/hunts/new",
      templateUrl: "templates/hunts/new.html"
    })
    .state('newTask', {
      url: "/hunts/:hunt_id/tasks/new",
      templateUrl: "templates/tasks/new.html"
    })
    .state('showTask', {
      url: "/hunts/:hunt_id/tasks/:id",
      templateUrl: "templates/tasks/show.html"
    })
  
    .state('showHunt', {
      url: "/hunts/:id",
      templateUrl: "templates/hunts/show.html"
    })
    .state('indexHunt', {
      url: "/hunts",
      templateUrl: "templates/hunts/index.html"
    });

  $urlRouterProvider.otherwise("/");
}