
'use strict';

var
  port            = 3002,
  express         = require('express'),
  app             = express(),
  jade_browser    = require('jade-browser'),
  passport        = require('passport'),
  _               = require('underscore'),
  session         = require('express-session'),
  redis_store     = require('connect-redis')(session),
  body_parser     = require('body-parser'),
  fs              = require('fs'),
  env             = process.env.NODE_ENV || 'development';

require('./lib/db')('nesta');
require('./lib/auth');
require('./lib/marked')(app);
require('cms/lib/view_helpers')(app);

if (env == 'development') {
  app.use(express.static('public'));
}

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
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
  res.locals.nav = require('./nav');
  if (req.isAuthenticated()) {
    res.locals.user = _.omit(req.user, [ 'password', '__v' ]);
    // Disable caching if logged in
    res.setHeader('Cache-Control', 'no-cache');
  } else {
    delete res.locals.user;
  }
  next();
});

app.use(jade_browser(
  '/jade.js',
  [ 'player/*.jade', 'cms/*.jade' ],
  { root: app.get('views'), minify: (env == 'production') }
));

app.use(require('cms/router'));

app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
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

app.listen(port);
console.log('Listening on port ' + port);


