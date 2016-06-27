




function configGrunt(grunt){
	"use strict";
	var version='1.0.0',
	    publishTime  = new Date().getTime(),
		buildPath ='build',
		distPath='dist';


	var jsVersion = {};
	jsVersion.build=buildPath+'/scripts/app-v'+version+'.js';
	jsVersion.build_vendor = buildPath+'/scripts/vendor.js';

	jsVersion.dist = distPath+'/scripts/app-v'+version+'.js';
	jsVersion.dist_vendor = distPath+'/scripts/vendor.js';


	var browserifyOption =  (function (){
		var  transform =   ['reactify','envify','babelify'];

		var build =  {
			files:{},

			options: {
				external:'react',
			 	transform: transform

			}
		} ;
		build.files[jsVersion.build]  = ['src/scripts/app.js'];
		var vendor={
			options: {
				require: ['react'],
				transform: transform

			}
		};
		vendor.dest = jsVersion.build_vendor;


		var dist = {
			 files:{},

			options: {
				transform: transform   ,
				external:'react',
			}
		} ;
		dist.files[jsVersion.dist]  =   ['src/scripts/app.js'];
		dist.files[jsVersion.dist_vendor]  =  ['src/scripts/vendor.js'];

		return{
			vendor:vendor,
			build:build,

			dist:dist
		} ;
	})();

	var uglifyOption =(function(){
		  var main={files:{}};
		  var dist ={files:{}};

		main.files[buildPath+'/scripts/vendor-v'+version+'.min.build']  = jsVersion.main;
		dist.files[distPath+'/scripts/vendor-v'+version+'.min.js']  =  jsVersion.dist;
		return{
			main:main,
			dist:dist
		} ;
	})();



	grunt.initConfig({
		// Metadata
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			build: browserifyOption.build,
			dist: browserifyOption.dist,
			vendor:  browserifyOption.vendor
		},

		copy:{
			build:{
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
			build:uglifyOption.build,
			dist:  uglifyOption.dist
		},

		replace:{
			build:{
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
		}


	});


	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');
	 
	 grunt.loadNpmTasks('grunt-browserify');


	grunt.loadNpmTasks('grunt-webpack');

	grunt.registerTask('default', ["copy:build","replace:build",'browserify:build','watch']);
	grunt.registerTask('build', ["copy:build","replace:build",'browserify','browserify','watch']);

	grunt.registerTask('dist', ["copy:dist","replace:dist",'browserify:dist','uglify:dist']);







	  


   

}

module.exports = configGrunt;
