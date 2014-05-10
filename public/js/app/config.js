
require.config({
  enforceDefine: true,
  baseUrl: '/js/app/',
  paths: {
    jquery:           '../../bower_components/jquery/dist/jquery',
    underscore:       '../../bower_components/underscore-amd/underscore',
    backbone:         '../../bower_components/backbone-amd/backbone',
    'backbone-forms': '../../bower_components/backbone-forms/distribution.amd/backbone-forms',
    jade:             '../../jade',
    markdown:         '../../bower_components/marked/lib/marked',
    bootstrap:        '../../bower_components/bootstrap/dist/js/bootstrap',
    jplayer:          '../../bower_components/jplayer/jquery.jplayer/jquery.jplayer',
    youtube:          'https://www.youtube.com/iframe_api?noext'
  },
  shim: {
    jade:              { exports: 'jade' },
    'backbone-forms':  { deps: [ 'backbone' ] },
    bootstrap:         { deps: [ 'jquery' ], exports: '$' },
    jplayer:           { deps: [ 'jquery' ] },
    youtube:           { exports: 'YT' }
  }
});

require.onError = function() {};

/*
if (window.nesta.env != 'production') {
  require.onError = function(err) {
    //console.log(err.stack);
    alert(err);
  };
}
*/
