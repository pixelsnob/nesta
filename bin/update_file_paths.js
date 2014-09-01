/**
 * Removes /users/images from path
 * 
 */
'use strict';

var
  db              = require('../config/db'),
  async           = require('async'),
  Image           = require('../models/image'),
  Sound           = require('../models/sound'),
  _               = require('underscore');

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});

db.connection.on('open', function() {

  async.waterfall([
    function(callback) {
      Image.find({}, function(err, images) {
        var c = 0;
        _.each(images, function(image) {
          Image.findByIdAndUpdate(image._id, {
            $set: { path: image.path.replace('/user/images/', '') }
          }, function(err) {
            if (err) {
              callback(err);
            }
            c++;
            if (c == images.length) {
              callback();
            }
          });
        });
      });
    },
    function(callback) {
      Sound.find({}, function(err, sounds) {
        var c = 0;
        _.each(sounds, function(sound) {
          Sound.findByIdAndUpdate(sound._id, {
            $set: { path: sound.path.replace('/user/sounds/', '') }
          }, function(err) {
            if (err) {
              callback(err);
            }
            c++;
            if (c == sounds.length) {
              callback();
            }
          });
        });
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

