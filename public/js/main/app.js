
define([
  'backbone',
  'lib/csrf',
  './views/app',
  './views/nav',
  'bootstrap'
], function(Backbone, csrf, AppView, NavView) {
  $(function() {
    new AppView;
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: false 
    });
  });
});

