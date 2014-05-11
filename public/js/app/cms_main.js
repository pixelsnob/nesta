
define([
  'backbone',
  'views/app',
  'views/cms/page',
  'bootstrap'
], function(Backbone, AppView, PageView) {
  
  $(function() {
    new AppView;
    new PageView;
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: false 
    });
  });
});

