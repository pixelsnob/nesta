
require.config({
  enforceDefine: true,
  paths: {
    jquery:           '../bower_components/jquery/jquery',
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
  'bootstrap'
], function(Backbone) {
  $(function() {
    
  });
});

if (window.app_data.env != 'production') {
  require.onError = function(err) {
    console.log(err.stack);
  };
}

