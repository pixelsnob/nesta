
'use strict';

var
  views_dir       = __dirname + '/views',
  express         = require('express'),
  app             = express(),
  routes          = require('./routes')(app),
  config          = require('./config/index')(app),
  jade_browser    = require('jade-browser'),
  passport        = require('passport'),
  _               = require('underscore'),
  session         = require('express-session'),
  redis_store     = require('connect-redis')(session),
  body_parser     = require('body-parser'),
  fs              = require('fs');

app.port = 3002;

var env = process.env.NODE_ENV || 'development';
if (env == 'development') {
  app.use(express.static('public'));
}

app.set('view engine', 'jade');
app.set('views', views_dir);
app.set('view cache', (env == 'production'));
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json({ extended: true }));
app.use(require('cookie-parser')());
app.use(session({
  store: new redis_store,
  secret: 'hot~dog',
  proxy: true,
  cookie: { secure: (env == 'production') },
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('csurf')());
app.locals.pretty = true;
app.locals._ = _;
app.use(function(req, res, next) {
  res.locals.csrf = req.csrfToken();
  res.locals.nav = config.nav;
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
  [ 'cms/*.jade', 'player/*.jade' ],
  { root: app.get('views'), minify: (env == 'production') }
));

// Routing
app.route('/login')
  .get(routes.main.loginForm)
  .post(routes.main.login);

app.get('/logout', routes.main.logout);

app.route('/cms/images')
  .get(routes.main.auth, routes.cms.getImages)
  .post(routes.main.auth, routes.main.uploadFile, 
        routes.cms.saveUploadedImage);

app.route('/cms/images/:id')
  .delete(routes.main.auth, routes.cms.deleteImage)
  .put(routes.main.auth, routes.cms.updateImage);

app.route('/cms/sounds')
  .get(routes.main.auth, routes.cms.getSounds)
  .post(routes.main.auth, routes.main.uploadFile, 
        routes.cms.saveUploadedSound);

app.route('/cms/sounds/:id')
  .put(routes.main.auth, routes.cms.updateSound)
  .delete(routes.main.auth, routes.cms.deleteSound);

app.route('/cms/pages/:page_id/content_blocks/:content_block_id')
  .get(routes.main.auth, routes.cms.getPageContentBlock)
  .put(routes.main.auth, routes.cms.savePageContentBlock);

app.get('/drop_shadows', function(req, res, next) {
  res.sendFile('./public/drop_shadows.html');
});

app.get('*', routes.cms.renderPage);

app.put(
  '*',
  routes.main.auth,
  routes.cms.savePage
);

// Temp logging for jplayer issues
if (fs.existsSync('./log/')) {
  app.post('/log/jplayer', function(req, res, next) {
    console.log(req.body);
    req.body.ts = (new Date).getTime();
    fs.writeFile(
      './log/jplayer.log',
      JSON.stringify(req.body) + "\n",
      { flag: 'a' },
      function(err) {
        if (err) {
          console.err(err);
        }
      }
    );
  });
}

app.use(function(req, res, next) {
  res.status(404).sendfile('./public/404.html');
});

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

// Any local overrides...
if (fs.existsSync('config/local.js')) {
  require('./config/local.js')(app);  
}

app.listen(app.port);
console.log('Listening on port ' + app.port);

