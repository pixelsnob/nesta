
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
  _               = require('underscore');

app.configure('development', function() {
  app.use(express.static(__dirname + '/public'));
});

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', views_dir);
  app.set('view cache', false);
  app.locals.pretty = true;
  app.locals._ = _;
  app.use(express.urlencoded()); 
  app.use(express.json());
});

// Quick and dirty markdown templates
app.get('*', function(req, res, next) {
  var file, url = req.url.replace(/\//, '');
  if (url.length) {
    file = views_dir + '/' + url + '.md';
  } else {
    file = views_dir + '/index.md';
  }
  fs.readFile(file, 'utf-8', function (err, content) {
    if (err) {
      return res.send(404);
    }
    res.render('index', { content: markdown(content) });
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

