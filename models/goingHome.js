// load the things we need
var mongoose = require('mongoose');
// define the schema for our user model
var goingHomeSchema = mongoose.Schema({
  timeLength : 'string',
  expenditure :'string',
  status :'boolean',
  destination: 'string',
  startPoint : 'string'
});


// create the model for users and expose it to our app
module.exports = mongoose.model('dayArray', goingHomeSchema);
