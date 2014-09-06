
'use strict';

var
  Page                  = require('../models/page'),
  Image                 = require('../models/image'),
  Sound                 = require('../models/sound'),
  formidable            = require('formidable'),
  fs                    = require('fs'),
  _                     = require('underscore'),
  path                  = require('path');

module.exports = function(app) {
  
  return {
    
    renderPage: function(req, res, next) {
      var path = req.path.replace(/\/$/, '').replace(/^\//, '');
      path = (path.length ? path : 'index');
      Page.findOne({ path: path }).exec(function(err, page) {
        if (err) {
          return next(err);
        }
        if (page) {
          res.format({
            html: function() {
              res.render(page.view, {
                page: page,
                title: page.title,
                keywords: page.keywords,
                description: page.description
              });  
            },
            json: function() {
              res.json(page);
            }
          });
        } else {
          next();
        }
      });
    },
    
    savePage: function(req, res, next) {
      Page.findById(req.body._id, function(err, page) {
        if (err) {
          return next(err);
        }
        if (page) {
          _.extend(page, _.omit(req.body, [ 'content_blocks', '_id' ]));
          page.save(function(err) {
            if (err) {
              return next(err);
            }
            res.send(req.body);
          });
        } else {
          next(new Error('Page not found'));
        }
      });
    },

    getPageContentBlock: function(req, res, next) {
      Page.findById(req.params.page_id, function(err, page) {
        if (err) {
          return next(err);
        }
        if (page) {
          var content_block = page.content_blocks.id(
            req.params.content_block_id);
          if (content_block) {
            res.send(content_block);
          } else {
            next(new Error('Content block not found'));
          }
        } else {
          next(new Error('Page not found'));
        }
      });
    },
    
    savePageContentBlock: function(req, res, next) {
      Page.findById(req.params.page_id, function(err, page) {
        if (err) {
          return next(err);
        }
        if (page) {
          var content_block = page.content_blocks.id(
            req.params.content_block_id);
          if (content_block) {
            _.extend(content_block, _.omit(req.body, '_id'));
            page.save(function(err, page) {
              if (err) {
                return next(err);
              }
              res.send(content_block);
            });
          } else {
            next(new Error('Content block not found'));
          }
        } else {
          next(new Error('Page not found'));
        }
      });
    },

    getImages: function(req, res, next) {
      Image.find(function(err, images) {
        if (err) {
          next(err);
        }
        var c = 0, out = [];
        _.each(images, function(image) {
          var regex = new RegExp(image.path, 'ig');
          Page.find({
            content_blocks: { $elemMatch: { content: regex }}
          }, function(err, pages) {
            if (err) {
              return next(err);
            }
            //image.page_count = pages.length;
            c++;
            var temp = _.extend({ page_count: pages.length }, image.toJSON());
            out.push(temp);
            if (out.length == images.length) {
              res.send(out);
            }
          });
        });
      });
    },
    
    saveUploadedImage: function(req, res, next) {
      if (typeof req.file == 'undefined') {
        return next(new Error('req.file is not defined'));
      }
      var dest_dir = './public/user/images/';
      if (!fs.existsSync(dest_dir)) {
        return next(new Error(dest_dir + ' does not exist'));
      }
      var file_name = req.file.name.toLowerCase();
      Image.findOne({ path: file_name }, function(err, existing) {
        if (err) {
          return next(err);
        }
        if (existing) {
          var image = existing;
        } else {
          var image = new Image;
        }
        _.extend(image, {
          path:      file_name,
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
    
    updateImage: function(req, res, next) {
      Image.findOne({ path: req.body.path, _id: { $ne: req.params.id }},
      function(err, existing) {
        if (err) {
          return next(err);
        }
        if (existing) {
          return next(new Error('Image by that path already exists'));
        }
        Image.findById(req.params.id, function(err, image) {
          if (err) {
            return next(err);
          }
          if (!image) {
            return next(new Error('Image not found'));
          }
          var file_name = path.basename(image.path);
          fs.rename('./public/user/images/' + file_name,
          './public/user/images/' + path.basename(req.body.path),
          function(err) {
            if (err) {
              return next(err);
            }
            //var old_path = image.path;
            _.extend(image, { path: path.basename(req.body.path) });
            image.save(function(err) {
              if (err) {
                return next(err);
              }
              res.json(image);
            });
            /*var regex = new RegExp(old_path.replace('/', '\/'), 'im');
            console.log(regex);
            Page.find({ content_blocks: { $elemMatch: { content: regex }}}, function(err, pages) {
              console.log(pages);
            });*/
          });
        });
      });
    },

    deleteImage: function(req, res, next) {
      Image.findByIdAndRemove(req.params.id, function(err, image) {
        if (err) {
          return next(err);
        }
        if (!image) {
          return res.send({ ok: true });
        }
        fs.unlink('./public/user/images/' + image.path, function(err) {
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

    updateSound: function(req, res, next) {
      Sound.findOne({ path: req.body.path, _id: { $ne: req.params.id }},
      function(err, existing) {
        if (err) {
          return next(err);
        }
        if (existing) {
          return next(new Error('Sound by that path already exists'));
        }
        Sound.findById(req.params.id, function(err, sound) {
          
          if (err) {
            return next(err);
          }
          if (!sound) {
            return next(new Error('Sound not found'));
          }
          fs.rename('./public/user/sounds/' + sound.path,
            './public/user/sounds/' + req.body.path,
          function(err) {
            if (err) {
              return next(err);
            }
            _.extend(sound, { path: req.body.path });
            sound.save(function(err) {
              if (err) {
                return next(err);
              }
              res.json(sound);
            });
          });
        });
      });
    },

    deleteSound: function(req, res, next) {
      Sound.findByIdAndRemove(req.params.id, function(err, sound) {
        if (err) {
          return next(err);
        }
        if (!sound) {
          return res.send({ ok: true });
        }
        fs.unlink('./public/user/sounds/' + sound.path, function(err) {
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
      var dest_dir = './public/user/sounds/';
      if (!fs.existsSync(dest_dir)) {
        return next(new Error(dest_dir + ' does not exist'));
      }
      var file_name = req.file.name.toLowerCase();
      Sound.findOne({ path: file_name }, function(err, existing) {
        if (err) {
          return next(err);
        }
        if (existing) {
          var sound = existing;
        } else {
          var sound = new Sound;
        }
        _.extend(sound, {
          path:      file_name,
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

