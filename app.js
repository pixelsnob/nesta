
'use strict';

var
  DB_OPTS = {
    server: {
      auto_reconnect: true,
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 10000
      }
    }
  },
  DB_URI          = 'mongodb://localhost/lapr',
  express         = require('express'),
  app             = express(),
  routes          = require('./routes')(app),
  mongoose        = require('mongoose'),
  db              = mongoose.connect(DB_URI, DB_OPTS),
  jade_browser    = require('jade-browser'),
  passport        = require('passport'),
  RedisStore      = require('connect-redis')(express),
  _               = require('underscore');

require('./auth');

app.configure('development', function() {
  app.use(express.static(__dirname + '/public'));
  //app.settings.force_js_optimize = true;
});

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.set('view cache', false);
  app.locals.pretty = true;
  app.locals.page = {
    title: 'CMS Prototype',
    keywords: 'awesome, nice, far-out',
    description: 'Yet another CMS'
  };
  app.locals._ = _;
  _.extend(app.locals, require('./view_helpers')(app));
  app.use(express.urlencoded()); 
  app.use(express.json());
  app.use(express.cookieParser());
  app.use(express.session({ store: new RedisStore, secret: 'hotdog' }));
  app.use(passport.initialize());
  app.use(passport.session());
  //app.use(express.csrf());
  app.use(function(req, res, next){
    res.locals.csrf = null; //req.csrfToken();
    if (req.isAuthenticated()) {
      res.locals.user = _.omit(req.user, 'password');
    } else {
      delete res.locals.user;
    }
    next();
  });
  //app.use(app.router);
  // Expose compiled templates to frontend
  app.use(jade_browser(
    '/jade.js',
    [ 'cms_page*', 'modal*' ],
    { root: app.get('views'), minify: false, debug: true }
  ));
});

db.connection.once('connected', function() {
  console.log('mongo connected');
});
db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
});
db.connection.on('disconnected', function(err) {
  console.log('mongo disconnected');
});
db.connection.on('reconnected', function() {
  console.log('mongo reconnected');
});

// Routes
app.get('/', function(req, res, next) {
  res.send(JSON.stringify(req.user));
});
app.get('/login', routes.loginForm);
app.post('/login', routes.login);
app.get('/logout', routes.logout);

// CMS dynamic routes
app.get('*', routes.renderCmsPage);
app.put(
  '*',
  routes.auth,
  routes.saveCmsPage,
  routes.saveCmsContentBlocks,
  routes.renderCmsPage
);

// Error page
app.use(function(err, req, res, next){
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

app.listen(3001);
console.log('Listening on port 3001');

