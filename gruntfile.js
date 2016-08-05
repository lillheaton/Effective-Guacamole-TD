
module.exports = function(grunt){
	'use strict';

	require('load-grunt-tasks')(grunt);

	/**
	 * Grunt config
	 */
	grunt.initConfig({

		/***************************
		 * Settings
		 ***************************/
		settings: {
			dev: 'src',
			dist: 'dist'
		},

		/***************************
		 * Connect
		 ***************************/
		connect: {
			options:{
				livereload: 35729
			},
			livereload: {
				options: {
					port: 9000,
					hostname: '*',
					base: '<%= settings.dist %>'
				}
			}
		},

		/***************************
		 * Watch
		 ***************************/
		watch: {
			options: {
		    	livereload: '<%= connect.options.livereload %>'
			},
			scripts:{
				files: ['<%= settings.dev %>/*.js']
			},
			html:{
				files: ['<%= settings.dev %>/*.html'],
				tasks: ['copy:html']
			},
			json: {
				files: ['<%= settings.dev %>/data/json/*.json'],
				tasks: ['copy:data']
			}
		},

		/***************************
		 * Browserify
		 ***************************/
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				},
				plugin: [
				],
				transform: [
					['babelify', {
						presets: ['es2015']
					}]
				]
			},
			dev: {
				options: {
					watch: true
				},
				files: [{
					src: ['<%= settings.dev %>/app.js'],
					dest: '<%= settings.dist %>/app.js'
				}]
			}
		},

		/***************************
		 * Static files
		 ***************************/
		copy: {
			html: {
				files: [{
					src: '<%= settings.dev %>/index.html',
					dest: '<%= settings.dist %>/index.html'
				}]
			},
			data: {
				files: [{
					expand: true,
					cwd: '<%= settings.dev %>/data',
					src: '**',
					dest: '<%= settings.dist %>/data/'
				}]
			} 
		}
	});

	grunt.registerTask('dev', [
		'copy:html',
		'copy:data',
		'browserify:dev'
	]);

	grunt.registerTask('server', [
		'connect',
		'dev',
		'watch'
	]);	

	//
	// Default
	//
	grunt.registerTask('default', 'server');
};