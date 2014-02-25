
var
  jade                  = require('jade'),
  Page                  = require('./models/page'),
  ContentBlock          = require('./models/content_block'),
  passport              = require('passport'),
  _                     = require('underscore');

module.exports = function(app) {
  
  return {
    
    renderCmsPage: function(req, res, next) {
      var path = req.path.replace(/\/$/, '').replace(/^\//, '');
      path = (path.length ? path : 'index');
      Page.findOne({ path: path }).populate('slots.content_block')
      .exec(
        function(err, page) {
          if (err) {
            return next(err);
          }
          if (page) {
            // Flatten for use by views. Maybe move this to the backend?
            var content_blocks = {};
            page.slots.forEach(function(slot) {
              content_blocks[slot.name] = {
                content: slot.content_block.content
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
          res.cookie('jnocache', 1, {
            expires: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000))
          });
          res.redirect('/');
        });
      })(req, res, next);
    },
    
    logout: function(req, res, next) {
      req.logout();
      //res.clearCookie('jnocache');
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

