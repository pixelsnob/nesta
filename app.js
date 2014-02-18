
'use strict';

var
  port            = 3002,
  views_dir       = __dirname + '/views',
  fs              = require('fs'),
  express         = require('express'),
  app             = express(),
  marked          = require('marked'),
  markdown        = require('markdown').markdown,
  jade            = require('jade'),
  mongoose        = require('mongoose'),
  RedisStore      = require('connect-redis')(express),
  _               = require('underscore'),
  child_process   = require('child_process'),
  exec_sync       = require('execSync'),
  util            = require('util');

/*marked.setOptions({
  gfm: true,
  breaks: true,
  tables: true,
  sanitize: false,
  smartypants: false
});*/

// Intercept markdown filter
jade.filters.md = function(text, opts) {
  // return markdown.toHTML(text, 'Gruber');
  //return marked(text);
  var ret = exec_sync.exec('pandoc ' + opts.filename)
  if (ret.code !== 0) {
    throw new Error(ret.stdout);
    return;
  }
  return ret.stdout;
};

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', views_dir);
  app.set('view cache', true);
  app.locals.pretty = true;
  app.locals._ = _;
  app.use(express.urlencoded()); 
  app.use(express.json());
  app.use(express.static('public'));
  app.use(express.json());
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

