
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
      compile: {
        options: {
          baseUrl: 'public/js',
          mainConfigFile: 'public/js/config.js',
          name: 'main',
          paths: {
            require_lib: '../bower_components/requirejs/require',
            jade: 'empty:'
          },
          include: [ 'require_lib', 'config' ],
          out: 'public/dist/js/main.js'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', [ 'less', 'requirejs' ]);
};
