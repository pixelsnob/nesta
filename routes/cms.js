
'use strict';

var
  Page                  = require('../models/page'),
  ContentBlock          = require('../models/content_block'),
  Image                 = require('../models/image'),
  Sound                 = require('../models/sound'),
  formidable            = require('formidable'),
  fs                    = require('fs'),
  _                     = require('underscore');

module.exports = function(app) {
  
  return {
    
    renderPage: function(req, res, next) {
      var path = req.path.replace(/\/$/, '').replace(/^\//, '');
      path = (path.length ? path : 'index');
      Page.findOne({ path: path }).populate('content_blocks.content_block')
      .exec(
        function(err, page) {
          if (err) {
            return next(err);
          }
          if (page) {
            res.format({
              html: function() {
                res.render(page.view, {
                  page: page
                });  
              },
              json: function() {
                res.json(page);
              }
            });
          } else {
            next();
          }
        }
      );
    },
    
    savePage: function(req, res, next) {
      var id = req.body._id;
      Page.findByIdAndUpdate(id, _.omit(req.body, [ 'content_blocks', '_id' ]),
      function(err, page) {
        if (err) {
          return next(err);
        }
        if (page) {
          next();
        } else {
          next(new Error('Page not found'));
        }
      });
    },

    saveContentBlocks: function(req, res, next) {
      if (!_.isArray(req.body.content_blocks)) {
        return next(new Error('req.body.content_blocks must be an array!'));
      }
      var c = 0;
      req.body.content_blocks.forEach(function(content_block) {
        var id              = content_block.content_block._id,
            content_block   = _.omit(content_block.content_block, '_id');
        ContentBlock.findByIdAndUpdate(id, content_block, function(err) {
          if (err) {
            return next(err);
          }
          c++;
          if (c == req.body.content_blocks.length) {
            next();
          }
        });
      });
    },

    getImages: function(req, res, next) {
      Image.find(function(err, images) {
        if (err) {
          next(err);
        }
        res.send(images);
      });
    },
    
    saveUploadedImage: function(req, res, next) {
      if (typeof req.file == 'undefined') {
        return next(new Error('req.file is not defined'));
      }
      var dest_dir = './public/images/';
      if (!fs.existsSync(dest_dir)) {
        return next(new Error(dest_dir + ' does not exist'));
      }
      var file_name = req.file.name.toLowerCase(),
          path = '/images/' + file_name;
      Image.findOne({ path: path }, function(err, existing) {
        if (err) {
          return next(err);
        }
        if (existing) {
          var image = existing;
        } else {
          var image = new Image;
        }
        _.extend(image, {
          path:      path,
          mime_type: req.file.type,
          size:      req.file.size
        });
        image.save(function(err) {
          if (err) {
            return next(err);
          }
          fs.rename(req.file.path, dest_dir + file_name, function(err) {
            if (err) {
              return next(err);
            }
            res.json(image);
          });
        });
      });
    },

    deleteImage: function(req, res, next) {
      Image.findByIdAndRemove(req.params.id, function(err, image) {
        if (err) {
          return next(err);
        }
        fs.unlink('./public' + image.path, function(err) {
          if (err) {
            // Don't notify user of this error, just log it
            console.error(err);
          }
          res.send({ ok: true });
        });
      });
    },

    getSounds: function(req, res, next) {
      Sound.find(function(err, sound_files) {
        if (err) {
          next(err);
        }
        res.send(sound_files);
      });
    },

    deleteSound: function(req, res, next) {
      Sound.findByIdAndRemove(req.params.id, function(err, sound) {
        if (err) {
          return next(err);
        }
        fs.unlink('./public' + sound.path, function(err) {
          if (err) {
            // Don't notify user of this error, just log it
            console.error(err);
          }
          res.send({ ok: true });
        });
      });
    },

    saveUploadedSound: function(req, res, next) {
      if (typeof req.file == 'undefined') {
        return next(new Error('req.file is not defined'));
      }
      var dest_dir = './public/sounds/';
      if (!fs.existsSync(dest_dir)) {
        return next(new Error(dest_dir + ' does not exist'));
      }
      var file_name = req.file.name.toLowerCase(),
          path = '/sounds/' + file_name;
      Sound.findOne({ path: path }, function(err, existing) {
        if (err) {
          return next(err);
        }
        if (existing) {
          var sound = existing;
        } else {
          var sound = new Sound;
        }
        _.extend(sound, {
          path:      path,
          mime_type: req.file.type,
          size:      req.file.size
        });
        sound.save(function(err) {
          if (err) {
            return next(err);
          }
          fs.rename(req.file.path, dest_dir + file_name, function(err) {
            if (err) {
              return next(err);
            }
            res.json(sound);
          });
        });
      });
    }
    
  };
};

