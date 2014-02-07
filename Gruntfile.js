
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
          'public/css/main.css': 'public/less/main.less'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', [ 'less' ]);
};
