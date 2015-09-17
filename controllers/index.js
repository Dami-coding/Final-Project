var express        = require('express');
var router         = express.Router();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var request        = require('request');

// router.use('', router);
router.use('/api/users', require('./users'));
router.use('/api/auth', require('./authentication'))

router.get('/api/events', function(req, res){
  var latitude  = "51.518959";
  var longitude = "-0.0680837";
  var query;

  if (req.query.categories) {
    var options   = {
      url: "https://www.eventbriteapi.com/v3/events/search/?categories="+req.query.categories+"&location.latitude="+latitude+"&location.longitude="+longitude+"&location.within=2mi&sort_by=distance",
      headers: {
        'Authorization': "Bearer " + process.env.EVENTBRITE_SWINGY_PERSONAL_TOKEN
      }
    };
  } else {
    var options   = {
      url: "https://www.eventbriteapi.com/v3/events/search/?q="+req.query.q+"&location.latitude="+latitude+"&location.longitude="+longitude+"&location.within=2mi&sort_by=distance",
      headers: {
        'Authorization': "Bearer " + process.env.EVENTBRITE_SWINGY_PERSONAL_TOKEN
      }
    };
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.status(200).send(JSON.parse(body));
    } else {
      res.status(500).send(JSON.parse(error));
    }
  })
});

router.get('/', function(req, res) {
 res.render("index");
});


module.exports = router;