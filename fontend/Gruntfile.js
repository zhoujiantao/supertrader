




function configGrunt(grunt){
	"use strict";
	var version='1.0.0',
	    publishTime  = new Date().getTime(),
		buildPath ='build',
		distPath='dist';


	var jsVersion = {};
	jsVersion.main=buildPath+'/scripts/vendor-v'+version+'.js';
	jsVersion.dist = distPath+'/scripts/vendor-v'+version+'.js';

	var browserifyOption =  (function (){
		var  transform =   ['reactify','envify','babelify'];

		var main =  {
			files:{},

			options: {
			 	transform: transform

			}
		} ;
		main.files[jsVersion.main]  = ['src/scripts/**/*.js','src/scripts/*.js','src/scripts/**/**/*.js'];

		var dist = {
			 files:{},
			options: {
				transform: transform
			}
		} ;
		dist.files[jsVersion.dist]  =   ['src/scripts/**/*.js','src/scripts/*.js','src/scripts/**/**/*.js'];

		return{
			main:main,
			dist:dist
		} ;
	})();

	var uglifyOption =(function(){
		  var main={files:{}};
		  var dist ={files:{}};

		main.files[buildPath+'/scripts/vendor-v'+version+'.min.js']  = jsVersion.main;
		dist.files[distPath+'/scripts/vendor-v'+version+'.min.js']  =  jsVersion.dist;
		return{
			main:main,
			dist:dist
		} ;
	})();

	var stylusOption = (function(){
		var main={files:{}};
		var dist ={files:{}};

		var source = ['src/styles/dist-config/*.styl'];

		main.files[buildPath+'/styles/vendor-v'+version+'.min.css']  = source;
		dist.files[distPath+'/styles/vendor-v'+version+'.min.css']  =source;
		return{
			main:main,
			dist:dist
		} ;
	})();


	grunt.initConfig({
		// Metadata
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			main: browserifyOption.main,
			dist: browserifyOption.dist
		},
		stylus:{
		   main:stylusOption.main,
			dist:stylusOption.dist
		},
		copy:{
			 main:{
				files:[
					{expand: true,flatten:true, src: ['src/index.html'], dest: 'build/'},
					{expand: true,flatten:true, src: ['src/styles/imgs/*.*'], dest: 'build/styles/imgs'}
				]
			},
			dist:{
				files:[{expand: true,flatten:true, src: ['src/index.html'], dest: 'dist/'}]
			}
		},
		uglify:{
			main:uglifyOption.main,
			dist:  uglifyOption.dist
		},

		replace:{
			main:{
				src: ['build/*.html'],
				overwrite: true,
				replacements:[
					{

						from:'{version}',
						to:'-v'+version
					},

					{
						from:'{PublishTime}',
						to: "<%= grunt.template.today('yyyymmddhhMMss') %>"
					} ,
					{

						from:'{usemin}',
						to:''
					}
				]
			},
			dist:{
				src: ['dist/*.html'],
				overwrite: true,
				replacements:[
					{

						from:'{version}',
						to:'-v'+version
					},
					{
						from:'{PublishTime}',
						to: "<%= grunt.template.today('yyyymmddhhMMss') %>"
					},
					{

						from:'{usemin}',
						to:'.min'
					}
				]
			}
		},
		connect: {
			server: {
				options: {
					port: 4000,
					base: 'build',
					hostname: 'localhost'
				}
			}

		},
		watch: {


			files:[
				'src/scripts/**/*.*',
				'src/styles/**/*.*'
			],
			tasks:['default'] ,
			options: {
				interrupt: false
			}
		},
		webpack: {
			build: {
				// webpack options
				entry: "./client/lib/index.js",
				output: {
					path: "asserts/",
					filename: "[hash].js",
				},

				stats: {
					// Configure the console output
					colors: false,
					modules: true,
					reasons: true
				},
				// stats: false disables the stats output

				storeStatsTo: "xyz", // writes the status to a variable named xyz
				// you may use it later in grunt i.e. <%= xyz.hash %>

				progress: false, // Don't show progress
				// Defaults to true

				failOnError: false, // don't report error to grunt if webpack find errors
				// Use this if webpack errors are tolerable and grunt should continue

				watch: true, // use webpacks watcher
				// You need to keep the grunt process alive

				keepalive: true, // don't finish the grunt task
				// Use this in combination with the watch option

				inline: true,  // embed the webpack-dev-server runtime into the bundle
				// Defaults to false

				hot: true, // adds the HotModuleReplacementPlugin and switch the server to hot mode
				// Use this in combination with the inline option

			},
			dist: {}
		}

	});


	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');
	 
	 grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-stylus');

	grunt.loadNpmTasks('grunt-webpack');

	grunt.registerTask('default', ["copy:main","replace:main",'browserify:main','stylus:main','watch']);

	grunt.registerTask('dist', ["copy:dist","replace:dist",'browserify:dist','uglify:dist','stylus:dist']);







	  


   

}

module.exports = configGrunt;
