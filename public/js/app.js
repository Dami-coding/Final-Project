angular
  .module('swingy', ['angular-jwt','ui.router', 'ngResource'])
  .constant('API', 'http://localhost:3000/api/auth')
  .config(MainRouter, function($httpProvider) {
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
    .state('home', {
      url: "/",
      templateUrl: "../templates/home/home.html"
    })
    .state('newEvent', {
      url: "/events/index",
      templateUrl: "../templates/events/index.html"
    })

  $urlRouterProvider.otherwise("/");
}