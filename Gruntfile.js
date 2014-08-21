'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
     casperjs: {
	options: {
	   async: {
	     parallel: false
	   }
	},
        files: ['aloja-web/tests/*.js']
     }
  });

  grunt.loadNpmTasks('grunt-casperjs');

  grunt.registerTask('test', ['casperjs']);
  grunt.registerTask('default', ['connect']);
};
