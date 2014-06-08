var opt = require('./options');

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.loadNpmTasks('grunt-contrib-clean');
  	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.initConfig({
		
		jshint: {
	  		src: ['src/app.js', 'src/models/**/*.js', 'src/routes/**/*.js'],
	  		options: {
	  			curly: true,
	  			eqeqeq: true
	  		}
	  	},

	  	// Configure a mochaTest task
	    mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/selenium/**/*.js']
			}
	    },

	    clean: {
	    	release: 'www-release'
	    },

	    requirejs: {
			compile: {
				options: opt
			}
    	}

	});

	// Default task.
	grunt.registerTask('default', ['mochaTest']);
	// grunt.registerTask('default', ['clean', 'requirejs']);

};