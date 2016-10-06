var gulp = require('gulp');
var watcher = require('gulp-watch');
var browserSync = require('browser-sync').create();


var hasWatch = false;

var build = function(){
    console.log('build  start....');
    gulp.src(['./src/**/*'])
        .pipe(gulp.dest('./dist'));

     if(!hasWatch)
     {
         hasWatch = true;
         watcher('./src/**/*', function () {
             build();
             browserSync.reload();
         });
     }

}

gulp.task('default',function(){
    browserSync.init({
        server: {
            baseDir: "./dist"


        } ,
        port:5000
    });

    build();
});
gulp.task('copy_vendor',function(){

    gulp.src(['./bower_components/**/*'])
        .pipe(gulp.dest('./dist/vendor'))
});