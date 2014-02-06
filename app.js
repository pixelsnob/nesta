
'use strict';

var
  express         = require('express'),
  app             = express(),
  mongoose        = require('mongoose'),
  RedisStore      = require('connect-redis')(express),
  _               = require('underscore');

app.configure('development', function() {
  app.use(express.static(__dirname + '/public'));
});

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.set('view cache', false);
  app.locals.pretty = true;
  app.locals._ = _;
  app.use(express.urlencoded()); 
  app.use(express.json());
  //app.use(express.cookieParser());
  //app.use(express.session({ store: new RedisStore, secret: 'hotdog' }));
});

// Routes
app.get('/', function(req, res, next) {
  res.render('index');
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

var port = 3002;

app.listen(port);
console.log('Listening on port ' + port);

