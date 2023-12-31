// load the things we need
var mongoose = require('mongoose');
// define the schema for our user model
var daySchema = mongoose.Schema({
  goingHome : 'object',
  goingUni: 'object',
  overallCash : 'number',
  totalTime:'number',
  dayCounter : 'number'
});


// create the model for users and expose it to our app
module.exports = mongoose.model('User/daysArray', daySchema);
