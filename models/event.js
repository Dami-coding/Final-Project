var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new mongoose.Schema({
  name       : String,
  address    : String,
  host       : String,
  location   : String,
  url        : String,
  price      : String,
  img_url    : String,
  lat        : String,
  lon        : String,
  description: String,
  date       : Date
})

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;