var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


// router.use('', router);
router.use('/api/users', require('./users'));
router.use('/api/events', require('./events'));
router.use('/api/auth', require('./authentication'))

router.get('/', function(req, res) {
 res.render("index");
});


module.exports = router;