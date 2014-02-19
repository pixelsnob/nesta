
'use strict';

var
  port            = 3002,
  views_dir       = __dirname + '/views',
  fs              = require('fs'),
  express         = require('express'),
  app             = express(),
  marked          = require('marked'),
  jade            = require('jade'),
  mongoose        = require('mongoose'),
  RedisStore      = require('connect-redis')(express),
  _               = require('underscore'),
  child_process   = require('child_process'),
  util            = require('util');

marked.setOptions({
  gfm: true,
  breaks: true,
  tables: true,
  sanitize: false,
  smartypants: true
});

// Intercept markdown filter
jade.filters.md = function(text, opts) {
  return marked(text);
};

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', views_dir);
  app.set('view cache', false);
  app.locals.pretty = true;
  app.locals._ = _;
  app.use(express.urlencoded()); 
  app.use(express.json());
  app.use(express.static('public'));
});

app.get('/', function(req, res, next) {
  res.render('index');
});

// Keeps files in sync with master
app.post('/sync', function(req, res, next) {
  child_process.exec('bin/sync', function(err, stdout, stderr) {
    if (err) {
      console.log(err);
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


