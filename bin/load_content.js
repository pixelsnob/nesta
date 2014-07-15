
'use strict';

var
  db              = require('../db'),
  async           = require('async'),
  readdir         = require('recursive-readdir'),
  fs              = require('fs'),
  User            = require('../models/user'),
  Page            = require('../models/page'),
  Image           = require('../models/image'),
  SoundFile       = require('../models/sound'),
  content_dir     = __dirname + '/../views/content',
  images_dir      = __dirname + '/../public/user/images',
  sounds_dir      = __dirname + '/../public/user/sounds';

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});

db.connection.on('open', function() {

  var page_cb_ids   = [],
      layout_cb_ids = [],
      layout_id;

  Page.collection.drop();

  async.waterfall([
    // Get paths of all content files
    function(callback) {
      var i = 0;
      readdir(content_dir, function(err, files) {
        var paths = [];
        files.forEach(function(path) {
          var file = require('path').basename(path);
          if (file.match(/^\./g) === null) {
            paths.push(path);
          }
        });
        callback(null, paths);
      });
    },
    // Create a page for each content file
    function(paths, callback) {
      var i = 0;
      paths.forEach(function(path) {
        fs.readFile(path, 'utf8', function (err, data) {
          if (err) {
            return callback(err);
          }
          path = path.replace(content_dir, '')
                     .replace(/^\//, '')
                     .replace(/\.md$/, '');
          Page.create({
            path: path,
            title: 'Nesta Steel Drum Band - Steel Pan - Los Angeles',
            description: 'Based in Santa Clarita, we regularly perform steel drums in Los Angeles, Orange County, Ventura, Santa Barbara, the Inland Empire, Palm Desert, and San Diego. Essentially, we play in many configurations - from a solo to a large steel drum band - in Southern California.',
            keywords: 'steel pan, steel drums, steel pans, steel drum, steel drummer, steel drum band, steel pan band, steel drums band, steel band, steel bands, Caribbean music, reggae music, steel drum music, calypso band, calypso music, tropical music, luau music',
            content_blocks: [{
              name: 'main',
              content: data,
              type: 'markdown'
            }],
            body_class: path.match(/^[^\/]*/)[0]
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
    },
    // Add some custom content
    function(callback) {
      var content_block = {
        name: 'slideshow',
        type: 'markdown',
        content: fs.readFileSync(content_dir + '/slideshow.md', 'utf8')
      };
      Page.findOneAndUpdate({ path: 'index' }, {
        $push: { content_blocks: content_block },
        $set: { view: 'cms/pages/index' }
      }, function(err) {
        if (err) {
          return callback(err);
        }
        callback();
      });
    },
    function(callback) {
      var content_block = {
        name: 'sounds',
        type: 'markdown',
        content: 'x'
      };
      Page.findOneAndUpdate({ path: 'index' }, {
        $push: { content_blocks: content_block }
      }, function(err) {
        if (err) {
          return callback(err);
        }
        callback();
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
    },
    // Add images
    function(callback) {
      Image.collection.drop();
      var c = 0;
      readdir(images_dir, function(err, images) {
        if (err) {
          return callback(err);
        }
        var d = images.length;
        images.forEach(function(path) {
          if (path.match(/\/\.[^\/]*$/) !== null) {
            d--;
            return;
          }
          Image.create({
            path: '/user/images' + path.replace(images_dir, '')
          }, function(err) {
            if (err) {
              return callback(err);
            }
            c++;
            if (c == d) {
              callback();
            }
          });
        });
      });
    },
    // Add sound files
    function(callback) {
      SoundFile.collection.drop();
      var c = 0;
      readdir(sounds_dir, function(err, sound_files) {
        if (err) {
          return callback(err);
        }
        var d = sound_files.length;
        sound_files.forEach(function(path) {
          if (path.match(/\/\.[^\/]*$/) !== null) {
            d--;
            return;
          }
          SoundFile.create({
            path: '/user/sounds' + path.replace(sounds_dir, '')
          }, function(err) {
            if (err) {
              return callback(err);
            }
            c++;
            if (c == d) {
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

