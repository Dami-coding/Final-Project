var express = require('express');
var router = express.Router();

// router.use('', router);
router.use('/users', require('./users'));
router.use('/events', require('./events'));

router.get('/', function(req, res) {
 res.render("index");
});


module.exports = router;