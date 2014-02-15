
'use strict';

var
  port            = 3002,
  views_dir       = __dirname + '/views',
  fs              = require('fs'),
  express         = require('express'),
  app             = express(),
  markdown        = require('marked'),
  mongoose        = require('mongoose'),
  RedisStore      = require('connect-redis')(express),
  _               = require('underscore'),
  git             = require('git-exec');

var repo = new git('./');

markdown.setOptions({
  gfm: true,
  tables: true,
  sanitize: true,
  smartypants: true
});

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', views_dir);
  app.set('view cache', false);
  app.locals.pretty = true;
  app.locals._ = _;
  app.use(express.urlencoded()); 
  app.use(express.json());
  app.use(express.static('public'));
  app.use(express.bodyParser());
  app.use(function(req, res, next) {
    // Load a markdown file from within a template
    res.locals.mdFile = function(file) {
      file = views_dir + '/content/' + file + '.md';
      var content = fs.readFileSync(file, 'utf-8');
      return markdown(content);
    };
    next();
  });
});

app.get('/', function(req, res, next) {
  res.render('index');
});

// Keeps repo in sync by receiving a git webhook
app.post('/git-msg', function(req, res, next) {
  repo.exec('pull', null, function(err, stdout) {
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

app.listen(port);
console.log('Listening on port ' + port);

