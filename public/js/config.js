
define([], function() {
  require.config({
    enforceDefine: true,
    baseUrl: '/js',
    paths: {
      jquery:           '../bower_components/jquery/dist/jquery',
      underscore:       '../bower_components/underscore-amd/underscore',
      backbone:         '../bower_components/backbone-amd/backbone',
      'backbone-forms': '../bower_components/backbone-forms/distribution.amd/backbone-forms',
      jade:             '../jade',
      markdown:         '../bower_components/marked/lib/marked',
      bootstrap:        '../bower_components/bootstrap/dist/js/bootstrap',
      jplayer:          '../bower_components/jplayer/jquery.jplayer/jquery.jplayer',
      youtube:          'https://www.youtube.com/iframe_api?noext',
      lib:              'main/lib',
      'jquery-ui':      '../bower_components/jquery-ui',
      slider:           '../bower_components/jquery-ui/ui/slider'
    },
    shim: {
      jade:              { exports: 'jade' },
      'backbone-forms':  { deps: [ 'backbone' ] },
      bootstrap:         { deps: [ 'jquery' ], exports: '$' },
      jplayer:           { deps: [ 'jquery' ] },
      youtube:           { exports: 'YT' }
    }
  });
});

