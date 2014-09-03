/**
 * Finds images in page content_blocks
 * 
 * 
 */
'use strict';

var
  db              = require('../config/db'),
  async           = require('async'),
  Page            = require('../models/page'),
  Image           = require('../models/image'),
  _               = require('underscore');

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});

db.connection.on('open', function() {

  async.waterfall([
    function(callback) {
      Image.find({}, function(err, images) {
        if (err) {
          return callback(err);
        }
        var c = 0;
        _.each(images, function(image) {
          var regex = new RegExp(image.path, 'ig');
          Page.find({ content_blocks: { $elemMatch: { content: regex } }
          }, function(err, pages) {
            if (err) {
              return next(err);
            }
            console.log(image.path, pages.length);
            c++;
            if (c == images.length) {
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

