var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    name     : String,
    email    : String,
    password : String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;