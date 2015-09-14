var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var logger      = require('morgan');
var router      = express.Router();
var path        = require('path');
var morgan      = require('morgan')
var request     = require('request');
var mongoose    = require('mongoose');
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/swingy'
mongoose.connect(databaseURL);




app.listen(3000, function(){
  console.log("running on 3000");
});

app.get('/', function(req, res){

  var token = process.env.EVENTBRITE_SWINGY_API;

  // console.log(res);

  request("https://www.eventbriteapi.com/v3/events/search/?q=node"+ "?token="+ token), function(err, response, body){
    if (err && response.statusCode === 200){
      console.log(body);
    } else {
      console.log(err);
    }

  };


})





module.exports = router




