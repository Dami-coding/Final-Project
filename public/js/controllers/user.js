angular
  .module('swingy')
  .controller('usersController', UserController);

UserController.$inject = ['User','TokenService']
function UserController(User, TokenService){
  var self = this;

  self.all    = [];
  self.user  = {};

  // Function to display the message back to the User
  function showMessage(res) {
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    if(token) { console.log(res); }
    self.message =  res.message ? res.message : null;
  }

  self.signup = function() {
    User.signup(self.agent, showMessage);
  }

  self.signin = function() {
    User.signin(self.agent, showMessage);
  }

  self.disappear = function() {
    TokenService.removeToken && TokenService.removeToken();
  }

  self.isLoggedIn = function() {
    return TokenService.isLoggedIn ? TokenService.isLoggedIn() : false;
  }

  self.getUsers = function() {
    self.all = User.query();
  }

  // Load agents only if you are logged in!
  if (self.isLoggedIn()) {
    self.getUsers();
    self.agent = TokenService.parseJwt();
  }

  return self;

}