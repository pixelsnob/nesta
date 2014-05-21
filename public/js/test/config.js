
define([], function() {
  require.config({
    baseUrl: '/js/app/',
    paths: {
      jasmine:          '../../bower_components/jasmine/lib/jasmine-core/jasmine',
      'jasmine-html':   '../../bower_components/jasmine/lib/jasmine-core/jasmine-html',
      'jasmine-boot':   '../../bower_components/jasmine/lib/jasmine-core/boot',
      'jasmine-jquery': '../../bower_components/jasmine-jquery/lib/jasmine-jquery'
    },
    shim: {
      jasmine:           { exports: 'jasmineRequire' },
      'jasmine-html':    { deps: [ 'jasmine' ], exports: 'jasmineRequire' },
      'jasmine-boot':    { deps: [ 'jasmine', 'jasmine-html' ], exports: 'jasmineRequire' },
      'jasmine-jquery':  { deps: [ 'jquery', 'jasmine-html' ], exports: 'jasmineRequire' }
    }
  });
});

