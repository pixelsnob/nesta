
'use strict';

var
  views_dir       = __dirname + '/views',
  express         = require('express'),
  app             = express(),
  fs              = require('fs');

app.port = 3002;


var env = process.env.NODE_ENV || 'development';

app.use(function(req, res, next) {
  res.locals.nav = require('./nav');
  next();
});

/* Let the CMS configure our app */

require('cms/configure')(app, {
  view_dir:    __dirname + '/views',
  jade_paths:  [ 'player/*.jade' ],
  db_name:     'nesta'
});

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

app.listen(app.port);
console.log('Listening on port ' + app.port);

