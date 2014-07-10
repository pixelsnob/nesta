
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
          'public/dist/css/cms.css': 'public/less/cms.less',
          'public/dist/css/ie8.css': 'public/less/ie8.less'
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
          baseUrl: 'public/js',
          mainConfigFile: 'public/js/config.js',
          paths: {
            require_lib: '../bower_components/requirejs/require',
            jade: 'empty:',
            youtube: 'empty:'
          },
          dir: 'public/dist/js',
          preserveLicenseComments: false,
          optimize: (process.env.NODE_ENV == 'production' ? 'uglify2' : 'none'),
          modules: [
            {
              name: 'main/app',
              include: [ 'config', 'require_lib' ]
            }, {
              name: 'cms/app',
              exclude: [ 'main/app' ]
            }
          ]
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', [ 'less', 'requirejs' ]);
};
