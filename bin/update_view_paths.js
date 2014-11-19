/**
 * Removes /cms from views path
 * 
 */
'use strict';

var
  db              = require('../lib/db')('nesta'),
  async           = require('async'),
  Page            = require('cms/models/page'),
  _               = require('underscore');

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});

db.connection.on('open', function() {

  async.waterfall([
    function(callback) {
      Page.find({}, function(err, pages) {
        var c = 0;
        _.each(pages, function(page) {
          Page.findByIdAndUpdate(page._id, {
            $set: { view: page.view.replace('cms/', '') }
          }, function(err) {
            if (err) {
              callback(err);
            }
            c++;
            if (c == pages.length) {
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

