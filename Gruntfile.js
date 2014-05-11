
module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'public/dist/css/main.css': 'public/less/main.less',
          'public/dist/css/cms.css': 'public/less/cms.less'
        }
      }
    },
    watch: {
      styles: {
        files: [ 'public/less/*.less' ],
        tasks: [ 'less' ],
        options: {
          nospawn: true
        }
      }
    },
    requirejs: {
      main: {
        options: {
          baseUrl: 'public/js/app',
          mainConfigFile: 'public/js/app/config.js',
          name: 'main',
          paths: {
            require_lib: '../../bower_components/almond/almond',
            jade: 'empty:',
            youtube: 'empty:'
          },
          include: [ 'config', 'require_lib' ],
          out: 'public/dist/js/main.js',
          preserveLicenseComments: false
        }
      },
      cms: {
        options: {
          baseUrl: 'public/js/app',
          mainConfigFile: 'public/js/app/config.js',
          name: 'cms_main',
          paths: {
            require_lib: '../../bower_components/almond/almond',
            jade: 'empty:',
            youtube: 'empty:'
          },
          include: [ 'require_lib', 'config' ],
          out: 'public/dist/js/cms_main.js',
          preserveLicenseComments: false
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', [ 'less', 'requirejs' ]);
};
