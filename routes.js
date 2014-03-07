
var
  jade                  = require('jade'),
  Page                  = require('./models/page'),
  ContentBlock          = require('./models/content_block'),
  Image                 = require('./models/image'),
  passport              = require('passport'),
  formidable            = require('formidable'),
  fs                    = require('fs'),
  mongoose              = require('mongoose'),
  _                     = require('underscore');

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
                res.render('cms_page', {
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
      var images = [];
      Image.find(function(err, images) {
        if (err) {
          next(err);
        }
        res.send(images);
      });
    },
    
    addImage: function(req, res, next) {
      var form       = new formidable.IncomingForm(),
          tmp_dir    = './tmp/images/',
          dest_path  = './public/images/';
      form.uploadDir = tmp_dir;
      if (!fs.existsSync(tmp_dir)) {
        return next(new Error(tmp_dir + ' does not exist'));
      }
      if (!fs.existsSync(dest_path)) {
        return next(new Error(dest_path + ' does not exist'));
      }
      form.parse(req, function(err, fields, files) {
        if (err) {
          return next(err);
        }
        if (typeof files.image == 'undefined') {
          return next(new Error('files.image is not defined'));
        }
        var file_name = files.image.name.toLowerCase(),
            file_path = dest_path + file_name;
        fs.rename(files.image.path, file_path, function(err) {
          if (err) {
            return next(err);
          }
          var path = '/images/' + file_name; 
          Image.findOne({ path: path }, function(err, existing) {
            if (err) {
              next(err);
            }
            var image;
            if (!existing) {
              image = new Image;
              image.path = path;
              image.save();
            } else {
              image = existing;
            }
            return res.json(image);
          });
        });
      });
    },

    deleteImage: function(req, res, next) {
      Image.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
          return next(err);
        }
        res.send({ 'req.id': req.params.id });
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
          // Make sure logged in user doesn't see cached pages
          res.cookie('nocache', 1, {
            expires: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)),
            httpOnly: false
          });
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

