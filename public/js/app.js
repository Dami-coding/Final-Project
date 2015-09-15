angular
  .module('scavengerHunt', ['ngResource', 'ui.router', 'angular-jwt'])
  .config(MainRouter)

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('signup', {
      url: "/signup",
      templateUrl: "templates/home/signup.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/home/login.html"
    })
    .state('home', {
      templateUrl: "templates/home/home.html",
      url: "/"
    })
    .state('newEvent', {
      url: "/events/new",
      templateUrl: "templates/events/new.html"
    })

  $urlRouterProvider.otherwise("/");
}