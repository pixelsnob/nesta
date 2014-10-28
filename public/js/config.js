
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
      'jquery-ui':      '../bower_components/jquery-ui',
      slider:           '../bower_components/jquery-ui/ui/slider',
      template:         'lib/template',
      vex:              '../bower_components/vex/js/vex',
      vex_dialog:       '../bower_components/vex/js/vex.dialog',
      cms:              '../cms/js',
      'cms-local':      'cms' // CMS library overrides go here
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

