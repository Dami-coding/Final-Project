var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var logger      = require('morgan');
var path        = require('path');
var morgan      = require('morgan')
var request     = require('request');
var passport    = require('passport');

var mongoose    = require('mongoose');
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/swingy'

var Event = require('./models/event');
var User = require('./models/user');

// Setup views
app.set("views", "./public");
app.engine('html', require('ejs').renderFile);


// Setup public folder to serve angular files
app.use(express.static(__dirname + "/public"))

// Setting up Mongoose
mongoose.connect(databaseURL);


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

// HAPPY
// -> 104,105,103,107,108,111,114,115,106,117
// -> 1009,2006,3002,3003,3004,3005,3005,3006,
//    3007,3008,3009,3010,3011,3012,3013,3014,3999

// GEEKY
// -> 80,56,67,102,112,
// -> 1004,2002,2003,2005,2007

// FUN
// -> 116.105,110,113,109,118,119
// -> 2006,4002,4003,4004,4005,4006,4007,4999,5001,
//    5002,5003,5004


// INSPIRE 
// -> 101,112
// -> 1004,1005,1006,1007,1010,1999,

// BOREDOM
// -> 1999,2999,3001,


// Listen for things happening on the app
app.listen(3000, function(){
  console.log("Swingy up and running on 3000...");
});