
var
  db              = require('../db'),
  async           = require('async'),
  ContentBlock    = require('../models/content_block'),
  Page            = require('../models/page'),
  _               = require('underscore');

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});

db.connection.on('open', function() {

  async.waterfall([
    function(callback) {
      ContentBlock.create({
        content: '[placeholder]',
        type: 'markdown' 
      }, function(err, content_block) {
        if (err) {
          return callback(err);
        }
        var new_cb = { content_block: content_block._id, name: 'slideshow' };
        Page.update({ path: 'index' }, {
          $push: { content_blocks: new_cb },
          $set: { view: 'cms/pages/index'}
        }, function(err, num) {
          if (err) {
            return callback(err);
          }
          console.log(num + ' docs updated');
          callback();
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

