var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var logger      = require('morgan');
var path        = require('path');
var morgan      = require('morgan');
var passport    = require('passport');
var expressJWT  = require("express-jwt");
var config      = require("./config/config");

// Setup mongoose
var mongoose    = require('mongoose');
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/swingy'
mongoose.connect(databaseURL);

require('./config/passport')(passport);

var Event = require('./models/event');
var User = require('./models/user');

// Setup views
app.set("views", "./public");
app.engine('html', require('ejs').renderFile);

// Setup public folder to serve angular files
app.use(express.static(__dirname + "/public"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Serving bower_components from root. Might change to public later
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(require("./controllers"));

// JWT access control. Important to have these before our routes!

// app
//   .use('/api', expressJWT({secret: config.secret})
//   .unless({path: ['/api/signin', '/api/signup'], method: 'post'}));

// // Handle "No authorization token was found" errors
// app.use(function (error, request, response, next) {
//   if (error.name === 'UnauthorizedError') {
//     response.status(401).json({message: 'You need an authorization token to view confidential information.'});
//   }
// });

// Listen for things happening on the app
app.listen(3000, function(){
  console.log("Swingy up and running on 3000...");
});

