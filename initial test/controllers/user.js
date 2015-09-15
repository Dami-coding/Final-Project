var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var User = require('../models/user');


// INDEX 
router.get('/', function(req, res){
  User.find()
  .populate('events')
  .exec(function(error, users){
    if(error)return res.status(404).json({message: 'Could not find any users'})
    return res.status(200).send(users);
  })
});

// SHOW
router.get('/:id', function(req,res){
  var id = req.params.id;
  User.findById({_id: id})
  .populate('events')
  .exec(function(error, user){
    if(error) return res.status(404).send({message: 'Could not find user'})
    return res.status(200).send(user);
  });
});

// POST
router.post('/', function(req, res){
  var user = new User(req.body);
  user.save(function(error){
    if(error) return res.status(403).send({message: 'Could not create user b/c' + error});
    return res.status(200).send(user);
  });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  User.findById(id, function(error, user){
    for (var i = 0; i < user.events.length; i++) {
      User.remove({_id: user.events[i]}, function(){});
    }
    User.remove({_id: id}, function(error){
      if (error) res.status(404).send({message: 'No user with that ID. Could not delete.'})
      return res.status(204).send({message: 'Deleted!'})
    });
  });
});

module.exports = router


