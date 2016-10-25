var fs = require('fs');
var gulp = require('gulp');

var sass = require('gulp-sass');
var es = require('event-stream');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var htmlbuild   = require('gulp-htmlbuild');

var rename = require("gulp-rename");


var buildHtml = function(rootPath){

    var gulpSrc = function (opts) {
        var paths = es.through();
        var files = es.through();

        paths.pipe(es.writeArray(function (err, srcs) {
            for(var i=0;i<srcs.length;i++)
            {
                srcs[i]='./src/'+ srcs[i];
            }
            gulp.src(srcs, opts).pipe(files);
        }));

        return es.duplex(paths, files);
    };


    var stream = gulp.src('./src/index.html');
    stream.pipe(htmlbuild({
        js: htmlbuild.preprocess.js(function (block) {



            block.pipe(gulpSrc())
                .pipe(concat('angular-app.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest(rootPath+'/js'));



            block.end('js/angular-app.min.js');


        }),
        css: htmlbuild.preprocess.css(function (block) {

            block.pipe(gulpSrc());
            stream.pipe(sass().on('error',sass.logError));
            stream.pipe(rename(function (path) {
                path.extname = ".css"
            }));

            block.end('css/angular.min.css');

        }),
    }));

    stream.pipe(gulp.dest(rootPath));
}




module.exports  = buildHtml;