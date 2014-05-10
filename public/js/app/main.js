
define([
  'backbone',
  'views/app',
  'bootstrap'
], function(Backbone, AppView) {
  $(function() {
    var app_view = new AppView;
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: false 
    });
  });
});

