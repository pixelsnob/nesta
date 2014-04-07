
require.config({
  enforceDefine: true,
  baseUrl: '/js/',
  paths: {
    jquery:           '../bower_components/jquery/dist/jquery',
    underscore:       '../bower_components/underscore-amd/underscore',
    backbone:         '../bower_components/backbone-amd/backbone',
    'backbone-forms': '../bower_components/backbone-forms/distribution.amd/backbone-forms',
    jade:             '../jade',
    markdown:         '../bower_components/marked/lib/marked',
    bootstrap:        '../bower_components/bootstrap/dist/js/bootstrap',
    jplayer:          '../bower_components/jplayer/jquery.jplayer/jquery.jplayer',
    youtube:          'https://www.youtube.com/iframe_api?noext'
    //html5media:       '../bower_components/html5media/cdn/www/1.1.7/html5media.min'
  },
  shim: {
    jade:              { exports: 'jade' },
    'backbone-forms':  { deps: [ 'backbone' ] },
    bootstrap:         { deps: [ 'jquery' ], exports: '$' },
    //html5media:        { exports: 'html5media' },
    jplayer:           { deps: [ 'jquery' ] },
    youtube:           { exports: 'YT' }
  }
});

/*
if (window.nesta.env != 'production') {
  require.onError = function(err) {
    //console.log(err.stack);
    alert(err);
  };
}
*/
