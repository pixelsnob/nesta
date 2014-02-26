
require.config({
  enforceDefine: true,
  paths: {
    jquery:           '../bower_components/jquery/dist/jquery',
    underscore:       '../bower_components/underscore-amd/underscore',
    backbone:         '../bower_components/backbone-amd/backbone',
    'backbone-forms': '../bower_components/backbone-forms/distribution.amd/backbone-forms',
    jade:             '../jade',
    markdown:         '../bower_components/marked/lib/marked',
    bootstrap:        '../bower_components/bootstrap/dist/js/bootstrap'
  },
  shim: {
    jade:              { exports: 'jade' },
    'backbone-forms':  { deps: [ 'backbone' ] },
    bootstrap:         { deps: [ 'jquery' ], exports: '$' }
  }
});

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

if (window.nesta.env != 'production') {
  require.onError = function(err) {
    console.log(err.stack);
  };
}

