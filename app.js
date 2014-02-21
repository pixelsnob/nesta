
'use strict';

var
  port            = 3002,
  views_dir       = __dirname + '/views',
  fs              = require('fs'),
  express         = require('express'),
  app             = express(),
  routes          = require('./routes')(app),
  marked          = require('marked'),
  jade            = require('jade'),
  redis_store     = require('connect-redis')(express),
  passport        = require('passport'),
  _               = require('underscore'),
  child_process   = require('child_process'),
  util            = require('util'),
  //mongoose        = require('mongoose'),
  db              = require('./db');

require('./auth');

marked.setOptions({
  gfm: true,
  breaks: true,
  tables: true,
  sanitize: true,
  smartypants: true
});

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', views_dir);
  app.set('view cache', true);
  app.use(express.urlencoded()); 
  app.use(express.json());
  app.use(express.cookieParser());
  app.use(express.session({ store: new redis_store, secret: 'hot~dog' }));
  app.use(express.static('public'));
  app.use(passport.initialize());
  app.use(passport.session());
  app.locals.pretty = true;
  app.locals._ = _;
  app.locals.markdown = marked;
  app.locals.renderContentBlock = function(name, page) {
    var content_block = _.findWhere(page.content_blocks, { name: name });
    if (content_block && content_block.content) {
      return marked(content_block.content);
    }
  };
});

/*app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/', function(req, res, next) {
  res.send(JSON.stringify(req.user));
});*/

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

// Keeps files in sync with master
app.post('/sync', function(req, res, next) {
  child_process.exec('bin/sync', function(err, stdout, stderr) {
    if (err) {
      console.error(err);
      return res.send(500);
    }
    console.log(stdout);
    res.send('ok');
  });
});

// Quick and dirty template autoload
app.get('*', function(req, res, next) {
  fs.exists(views_dir + req.url + '.jade', function(exists) {
    if (exists) {
      res.render(req.url.replace(/^\//, ''));
    } else {
      res.send(404);
    }
  });
});

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


