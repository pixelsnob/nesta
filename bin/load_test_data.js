var
  db              = require('../db'),
  async           = require('async'),
  readdir         = require('recursive-readdir'),
  fs              = require('fs'),
  ContentBlock    = require('../models/content_block'),
  User            = require('../models/user'),
  Page            = require('../models/page'),
  content_dir     = __dirname + '/../views/content',
  Layout          = require('../models/layout');

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});

db.connection.on('open', function() {

  var page_cb_ids   = [],
      layout_cb_ids = [],
      layout_id;

  ContentBlock.collection.drop();
  Page.collection.drop();

  async.waterfall([
    function(callback) {
      var i = 0;
      readdir(content_dir, function(err, files) {
        var paths = [];
        files.forEach(function(path) {
          var file = require('path').basename(path);
          if (!file.match(/^\./)) {
            paths.push(path);
          }
        });
        callback(null, paths);
      });
    },
    function(paths, callback) {
      var i = 0;
      paths.forEach(function(path) {
        fs.readFile(path, 'utf8', function (err, data) {
          if (err) {
            return callback(err);
          }
          ContentBlock.create({
            content: data,
            type: 'markdown' 
          }, function(err, content_block) {
            if (err) {
              return callback(err);
            }
            path = path.replace(content_dir, '')
              .replace(/^\//, '').replace(/\.md$/, '');
            Page.create({
              path: path,
              slots: [{
                name: 'main',
                content_block: content_block._id
              }]
            }, function(err, page) {
              if (err) {
                return callback(err);
              }
              i++;
              if (i == paths.length) {
                callback();
              }
            });
          });
        });
      });
    },
    // Add user(s)
    function(callback) {
      User.collection.drop();
      User.create({
        username: 'luis',
        password: '1234',
        name: 'Luis'
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

