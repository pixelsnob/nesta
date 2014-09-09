
'use strict';

var
  db              = require('../config/db'),
  async           = require('async'),
  User            = require('../models/user')

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});

db.connection.on('open', function() {

  async.waterfall([
    // Add user(s)
    function(callback) {
      User.collection.drop();
      User.create({
        username: 'abby',
        password: '12345',
        name: 'Abby'
      }, function(err) {
        if (err) {
          return callback(err);
        }
        callback();
      });
    }
  ], function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Done');
    }
    db.connection.close();
  });

});

