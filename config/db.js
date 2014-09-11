
'use strict';

var mongoose = require('mongoose');

var db_opts = {
  server: {
    auto_reconnect: true
    /*
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 10000
    }*/
  }
};

var db_name = process.env.NESTA_DB_NAME || 'nesta';

var db = module.exports = mongoose.connect(
  'mongodb://localhost/' + db_name, db_opts);

db.connection.once('connected', function() {
  console.log('mongo connected');
});
db.connection.on('error', function(err) {
  console.error('mongo error', err);
});
db.connection.on('disconnected', function(err) {
  console.log('mongo disconnected');
});
db.connection.on('reconnected', function() {
  console.log('mongo reconnected');
});

