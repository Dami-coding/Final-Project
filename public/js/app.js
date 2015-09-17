angular
  .module('swingy', ['angular-jwt','ui.router', 'ngResource', 'angular.filter'])
  .constant('API', 'http://localhost:3000/api/')
  .config(MainRouter)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

  

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('signup', {
      url: "/signup",
      templateUrl: "../templates/home/signup.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "../templates/home/login.html"
    })
    .state('landingpage', {
      url: "/landingpage/index",
      templateUrl: "../templates/landingpage/index.html"
    })
    .state('home', {
      url: "/",
      templateUrl: "../templates/home/home.html"
    })
    .state('about', {
      url: "/about/about",
      templateUrl: "../templates/about/about.html"
    })
    .state('events', {
      url: "/events/show",
      templateUrl: "../templates/events/show.html"
    })


  $urlRouterProvider.otherwise("/");

}