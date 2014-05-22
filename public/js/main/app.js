
define([
  'backbone',
  './views/app',
  'bootstrap'
], function(Backbone, AppView) {
  $(function() {
    new AppView;
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: false 
    });
  });
});

