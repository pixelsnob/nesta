
'use strict';

var
  port            = 3002,
  views_dir       = __dirname + '/views',
  fs              = require('fs'),
  express         = require('express'),
  app             = express(),
  routes          = require('./routes')(app),
  marked          = require('marked'),
  jade_browser    = require('jade-browser'),
  redis_store     = require('connect-redis')(express),
  passport        = require('passport'),
  _               = require('underscore'),
  child_process   = require('child_process'),
  util            = require('util'),
  db              = require('./db');

require('./auth');

var marked_opts = {
  gfm: true,
  breaks: true,
  tables: true,
  sanitize: true,
  smartypants: true
};

marked.setOptions(marked_opts);

app.configure('development', function() {
  app.use(express.static('public'));
});

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', views_dir);
  app.set('view cache', false);
  app.use(express.urlencoded()); 
  app.use(express.json());
  app.use(express.cookieParser());
  app.use(express.session({ store: new redis_store, secret: 'hot~dog' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.locals.pretty = true;
  app.locals._ = _;
  app.locals.markdown = marked;
  app.locals.marked_opts = marked_opts;
  app.use(function(req, res, next){
    //res.locals.csrf = null; //req.csrfToken();
    if (req.isAuthenticated()) {
      res.locals.user = _.omit(req.user, [ 'password', '__v' ]);
      // Disable caching if logged in
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      delete res.locals.user;
    }
    next();
  });
  // Expose some compiled templates to the front-end
  app.use(jade_browser(
    '/jade.js',
    [ 'cms_*', 'modal*' ],
    { root: app.get('views'), minify: false, debug: true }
  ));
});

app.get('/login', routes.loginForm);
app.post('/login', routes.login);
app.get('/logout', routes.logout);

app.get('*', routes.renderCmsPage);
app.post(
  '*',
  routes.auth,
  routes.saveCmsPage,
  routes.saveCmsContentBlocks,
  routes.sendBody
);

app.get('/images', routes.auth, routes.getImages);

// Error page
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.format({
    html: function() {
      res.render('error', { error: err.message });
    },
    json: function() {
      res.json(err);
    }
  });
});

app.listen(port);
console.log('Listening on port ' + port);

