var express = require('express');
var router = express.Router();

var Task = require('../models/event');
var Hunt = require('../models/user');

// INDEX
router.get('/', function(req, res){
  var id = req.params.id;
  Task.find(function(error, tasks){
    if(error) return res.status(404).send({message: 'Could not find tasks'})
    return res.status(200).send(tasks);
  });
});

// SHOW
router.get('/:id', function(req, res){
  var id = req.params.id;
  Task.findById({_id: id}, function(error, task){
    if(error) return res.status(404).send({message: 'Could not find task'})
    return res.status(200).send(task);
  });
});

// POST
router.post('/', function(req, res){
  var task = new Task(req.body.task);
  task.save(function(error, task){
    Hunt.findByIdAndUpdate({_id: req.body.hunt_id}, {$push: {"tasks": task._id}}, function(error){
      if(error) return res.status(403).send({message: 'Could not create task b/c' + error});
      return res.status(200).send(task);
    });
  });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Task.remove({_id: id}, function(error){
    if (error) res.status(404).send({message: 'No task with that ID. Could not delete.'})
    return res.status(204).send({message: 'Deleted!'});
  });
});

module.exports = router