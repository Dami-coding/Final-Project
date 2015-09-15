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

// Setting up Mongoose
mongoose.connect(databaseURL);

// Need to search using http://localhost:3000/?q=dance
app.get('/', function(req, res){

  var latitude  = "51.518959";
  var longitude = "-0.0680837";

  var options = {
    url: "https://www.eventbriteapi.com/v3/events/search/?q="+req.query.q+"&location.latitude="+latitude+"&location.longitude="+longitude+"&location.within=2mi&sort_by=distance",
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

app.listen(3000, function(){
  console.log("running on 3000");
});