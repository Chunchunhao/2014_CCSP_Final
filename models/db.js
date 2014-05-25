// db.js

var mongoose = require('mongoose');

//mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/test');
var mongoUri = 'mongodb://a:a@@ds033559.mongolab.com:33559/ccsp_final'
mongoose.connect(mongoUri);

// Error handler
mongoose.connection.on('error', function(err){
  console.log(err);
});

// Connection established
mongoose.connection.once('open', function(){
  console.log('database connection established');
});

require('./user');