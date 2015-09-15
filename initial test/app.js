var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var logger      = require('morgan');
// var router      = express.Router();
var path        = require('path');
var morgan      = require('morgan')
var request     = require('request');
var mongoose    = require('mongoose');
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/swingy'

// Setup views
app.set("view engine", "ejs");
app.set("views", "./views")

// Setup public folder to serve angular files
app.use(express.static(__dirname + "/public"))

// Setting up Mongoose
mongoose.connect(databaseURL);

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
// -> 104,105,103 etc...

// GEEKY
// -> 80,56,67 etc...

// Render the index page so that we can put Angular on it
app.get("/", function(req, res) {
  res.render("index");
})

// Listen for things happening on the app
app.listen(3000, function(){
  console.log("Swingy up and running on 3000...");
});