
'use strict';

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function(db_name) {
  var db = module.exports = mongoose.connect('mongodb://localhost/' + db_name);

  mongoose.connection.on('open', function() {
    console.log('mongo connected');
  });
  mongoose.connection.on('error', function(err) {
    console.error('mongo error', err);
  });
  mongoose.connection.on('disconnected', function(err) {
    console.log('mongo disconnected');
  });
  mongoose.connection.on('reconnected', function() {
    console.log('mongo reconnected');
  });
  return db;
};

