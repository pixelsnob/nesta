
require.config({
  enforceDefine: true,
  baseUrl: '/js/',
  paths: {
    jquery:           '../bower_components/jquery/dist/jquery',
    underscore:       '../bower_components/underscore-amd/underscore',
    backbone:         '../bower_components/backbone-amd/backbone',
    'backbone-forms': '../bower_components/backbone-forms/distribution.amd/backbone-forms',
    jade:             '../jade',
    markdown_lib:     '../bower_components/marked/lib/marked',
    markdown:         'modules/markdown',
    bootstrap:        '../bower_components/bootstrap/dist/js/bootstrap',
    jplayer:          '../bower_components/jplayer/jquery.jplayer/jquery.jplayer'

  },
  shim: {
    jade:              { exports: 'jade' },
    'backbone-forms':  { deps: [ 'backbone' ] },
    bootstrap:         { deps: [ 'jquery' ], exports: '$' },
    jplayer:           { deps: [ 'jquery' ] },
  }
});

if (window.nesta.env != 'production') {
  require.onError = function(err) {
    console.log(err.stack);
  };
}
