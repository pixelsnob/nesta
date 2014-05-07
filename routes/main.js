
'use strict';

var passport              = require('passport'),
    formidable            = require('formidable'),
    fs                    = require('fs'),
    _                     = require('underscore');

module.exports = function(app) {
  
  return {
    
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
        res.format({
          html: function() {
            next(new Error('You must be logged in to do that...'));
          },
          json: function() {
            res.status(403);
            res.send({ ok: 0 });
          }
        });
      } else {
        next();
      }
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
    }
  };
};

