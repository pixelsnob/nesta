
'use strict';

var
  jade                  = require('jade'),
  Page                  = require('./models/page'),
  ContentBlock          = require('./models/content_block'),
  Image                 = require('./models/image'),
  Sound                 = require('./models/sound'),
  Video                 = require('./models/video'),
  passport              = require('passport'),
  formidable            = require('formidable'),
  fs                    = require('fs'),
  mongoose              = require('mongoose'),
  _                     = require('underscore'),
  ffmpeg                = require('fluent-ffmpeg');

module.exports = function(app) {
  
  return {
    
    renderCmsPage: function(req, res, next) {
      var path = req.path.replace(/\/$/, '').replace(/^\//, '');
      path = (path.length ? path : 'index');
      Page.findOne({ path: path }).populate('content_blocks.content_block')
      .exec(
        function(err, page) {
          if (err) {
            return next(err);
          }
          if (page) {
            // Flatten for use by views. Maybe move this to the backend?
            var content_blocks = {};
            page.content_blocks.forEach(function(content_block) {
              content_blocks[content_block.name] = {
                content: content_block.content_block.content
              };
            });
            res.format({
              html: function() {
                res.render(page.view, {
                  page: page,
                  content_blocks: content_blocks
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
    
    saveCmsPage: function(req, res, next) {
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

    saveCmsContentBlocks: function(req, res, next) {
      if (!_.isArray(req.body.content_blocks)) {
        return next(new Error('req.body.content_blocks must be an array!'));
      }
      req.body.content_blocks.forEach(function(content_block) {
        var c               = 0,
            id              = content_block.content_block._id,
            content_block   = _.omit(content_block.content_block, '_id');
        ContentBlock.findByIdAndUpdate(id, content_block,
        function(err, existing_content_block) {
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
    },

    getVideos: function(req, res, next) {
      Video.find(function(err, videos) {
        if (err) {
          next(err);
        }
        res.send(videos);
      });
    },

    deleteVideo: function(req, res, next) {
      Video.findByIdAndRemove(req.params.id, function(err, video) {
        if (err) {
          return next(err);
        }
        fs.unlink('./public' + video.path, function(err) {
          if (err) {
            // Don't notify user of this error, just log it
            console.error(err);
          }
          res.send({ ok: true });
        });
      });
    },

    saveUploadedVideo: function(req, res, next) {
      if (typeof req.file == 'undefined') {
        return next(new Error('req.file is not defined'));
      }
      var dest_dir = './public/videos/';
      if (!fs.existsSync(dest_dir)) {
        return next(new Error(dest_dir + ' does not exist'));
      }
      var file_name = req.file.name.toLowerCase(),
                      //.replace(/\.[a-z0-9]{3,}$/, '.mp4'),
          path      = '/videos/' + file_name;
      Video.findOne({ path: path }, function(err, existing) {
        if (err) {
          return next(err);
        }
        if (existing) {
          var video = existing;
        } else {
          var video = new Video;
        }
        _.extend(video, {
          path:      path,
          mime_type: req.file.type,
          size:      req.file.size
        });
        video.save(function(err) {
          if (err) {
            return next(err);
          }
          fs.rename(req.file.path, dest_dir + file_name, function(err) {
            if (err) {
              return next(err);
            }
            res.json(video);
          });
        });
      });
    },
    
    uploadFile: function(req, res, next) {
      var form       = new formidable.IncomingForm(),
          tmp_dir    = './tmp/files/';
      form.uploadDir = tmp_dir;
      if (!fs.existsSync(tmp_dir)) {
        return next(new Error(tmp_dir + ' does not exist'));
      }
      form.parse(req, function(err, fields, files) {
        if (err) {
          return next(err);
        }
        if (typeof files.file == 'undefined') {
          return next(new Error('files.file is not defined'));
        }
        req.file = files.file;
        next();
      });
    },
    
    sendBody: function(req, res, next) {
      res.send(req.body);
    },

    loginForm: function(req, res, next) {
      if (req.isAuthenticated()) {
        return res.redirect('/');
      }
      res.render('login_form');
    },
    
    login: function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          req.session.messages =  [ info.message ];
          return res.redirect('/login');
        }
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          res.redirect('/');
        });
      })(req, res, next);
    },
    
    logout: function(req, res, next) {
      req.logout();
      res.redirect('/login');
    },

    getUser: function(req, res, next) {
      if (req.isAuthenticated()) {
        res.format({
          json: function() {
            res.json(req.user);
          }
        });
      }
    },

    auth: function(req, res, next) {
      if (!req.isAuthenticated()) {
        res.status(403);
        return next(new Error('You must be logged in to do that...'));
      } else {
        next();
      }
    }
  };
};

