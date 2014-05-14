
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
    youtube:          'https://www.youtube.com/iframe_api?noext',
    jasmine:          '../../bower_components/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html':   '../../bower_components/jasmine/lib/jasmine-core/jasmine-html',
    'jasmine-boot':   '../../bower_components/jasmine/lib/jasmine-core/boot',
    'spec':           '../test/spec/index'
  },
  shim: {
    jade:              { exports: 'jade' },
    'backbone-forms':  { deps: [ 'backbone' ] },
    bootstrap:         { deps: [ 'jquery' ], exports: '$' },
    jplayer:           { deps: [ 'jquery' ] },
    youtube:           { exports: 'YT' },
    jasmine:         { exports: 'jasmineRequire' },
    'jasmine-html':  { deps: [ 'jasmine' ], exports: 'jasmineRequire' },
    'jasmine-boot':  { deps: [ 'jasmine', 'jasmine-html' ], exports: 'jasmineRequire' }
  }
});

/*
if (window.nesta.env != 'production' && typeof console != 'undefined') {
  require.onError = function(err) {
    console.err(err.stack);
  };
}*/
