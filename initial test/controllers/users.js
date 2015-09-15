var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var User = require('../models/user');

//get list of users - working
router.get('/', function(req, res){
 User.find(function(err, users){
   if (err) {
     res.status(404).json({err: err, message: 'There are no users in the database.'});
   } else {
     res.status(200).send(users);
   }
   
 });
});

// create new user - working
router.post('/', function(req, res) {
 var user = new User(req.body);

 user.save(function(err) {
   if (err) {
     res.send(err);
   } 
   console.log('User added!');
   res.json(user);
 });
});

//find a single user - working
router.get('/:user_id', function(req, res){
 User.findById(req.params.user_id, function(err, user){
   if (err){
     res.send(err);
   }
   console.log("user id" + req.params.user_id + ' received');
   res.json(user);
 });
});

// update a user - working
router.put('/:user_id', function(req, res) {
 User.findByIdAndUpdate(req.params.user_id, req.body, function(err, user) {
   if (err) {
     console.log(err);
     res.json(err);
   } else {
     res.json(user);
     console.log("user updated");
   }
 });
});

// delete a user - working
router.delete('/:user_id', function(req, res) {

 User.findByIdAndRemove(req.params.user_id, function(err, user) {
   if (err) {
     res.json(err);
     console.log("There was an error, deleting the user, please check the request.");
     
   } else {
     console.log('User has been deleted');
     res.json({ message: 'User has been deleted - Yah!' } );
   }
 });
});

module.exports = router


