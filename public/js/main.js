

define([
  'backbone',
  'views/app',
  'markdown',
  'bootstrap'
], function(Backbone, AppView, markdown) {
  $(function() {
    markdown.setOptions(window.nesta.markdown_opts);
    var app_view = new AppView;
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: false 
    });
  });
});

if (window.nesta.env != 'production') {
  require.onError = function(err) {
    console.log(err.stack);
  };
}
