var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var logger      = require('morgan');
var path        = require('path');
var morgan      = require('morgan')
var request     = require('request');
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


// To search for a list of categories/subcategories, use:
// https://www.eventbriteapi.com/v3/categories/?token=(token) <- need to add token
// https://www.eventbriteapi.com/v3/subcategories/?token=(token) <- need to add token

// If searching by a search term, use:
// http://localhost:3000/events/?q=dance

// If searching by categories, use:
// http://localhost:3000/events/?categories=105,103
app.get('/events', function(req, res){

  var latitude  = "51.518959";
  var longitude = "-0.0680837";
  var options   = {
    // url: "https://www.eventbriteapi.com/v3/events/search/?q="+req.query.q+"&location.latitude="+latitude+"&location.longitude="+longitude+"&location.within=2mi&sort_by=distance",
    url: "https://www.eventbriteapi.com/v3/events/search/?categories="+req.query.categories+"&location.latitude="+latitude+"&location.longitude="+longitude+"&location.within=2mi&sort_by=distance",
        
    headers: {
      'Authorization': "Bearer " + process.env.EVENTBRITE_SWINGY_PERSONAL_TOKEN
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.status(200).send(JSON.parse(body));
    } else {
      res.status(500).send(JSON.parse(error));
    }
  })
});

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

