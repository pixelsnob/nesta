
'use strict';

var
  port            = 3002,
  views_dir       = __dirname + '/views',
  express         = require('express'),
  app             = express(),
  routes          = require('./routes')(app),
  marked          = require('./marked')(app),
  jade_browser    = require('jade-browser'),
  passport        = require('passport'),
  _               = require('underscore'),
  db              = require('./db'),
  session         = require('express-session'),
  redis_store     = require('connect-redis')(session);

/*memwatch.on('leak', function(info) {
  console.log(info);
});
memwatch.on('stats', function(stats) {
  console.log(stats);
});*/

require('./auth');

var env = process.env.NODE_ENV || 'development';
if (env == 'development') {
  app.use(express.static('public'));
}

app.set('view engine', 'jade');
app.set('views', views_dir);
app.set('view cache', (env == 'production'));
app.use(require('body-parser')());
app.use(require('cookie-parser')());
app.use(session({
  store: new redis_store,
  secret: 'hot~dog',
  proxy: true,
  cookie: { secure: (env == 'production') }
}));
app.use(passport.initialize());
app.use(passport.session());
app.locals.pretty = true;
app.locals._ = _;
app.use(function(req, res, next) {
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
  [ 'cms/**', 'modal*', 'player/**' ],
  { root: app.get('views'), minify: true }
));

// Routing
app.get('/login', routes.loginForm);
app.post('/login', routes.login);
app.get('/logout', routes.logout);

app.get('/cms/images', routes.auth, routes.getImages);
app.post('/cms/images', routes.auth, routes.uploadFile,
  routes.saveUploadedImage);
app.delete('/cms/images/:id', routes.auth, routes.deleteImage);

app.get('/cms/sounds', routes.auth, routes.getSounds);
app.post('/cms/sounds', routes.auth, routes.uploadFile,
  routes.saveUploadedSound);
app.delete('/cms/sounds/:id', routes.auth, routes.deleteSound);

app.get('*', routes.renderCmsPage);
app.put(
  '*',
  routes.auth,
  routes.saveCmsPage,
  routes.saveCmsContentBlocks,
  routes.sendBody
);

// Error page
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.format({
    html: function() {
      res.render('error', { error: err.message });
    },
    json: function() {
      res.status(500);
      res.json({ ok: 0 });
    }
  });
});

app.listen(port);
console.log('Listening on port ' + port);

