var gulp = require('gulp');
var watcher = require('gulp-watch');
var browserSync = require('browser-sync').create();


var hasWatch = false;

var copythirdparty=function(){
    gulp.src('./bower_components/**/.*')
        .pipe(gulp.dest('./dist/vendor/'));
}


var build = function(){

    console.log('build  start....');
    gulp.src(['./src/**/*'])
        .pipe(gulp.dest('./dist'));
    copythirdparty();
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
        port:3000
    });

    build();
});
gulp.task('copy_vendor',function(){

    gulp.src(['./bower_components/**/*'])
        .pipe(gulp.dest('./dist/vendor'))
});