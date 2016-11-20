var gulp = require('gulp');
var copyVendor = function(rootPath,dev){

    if(dev)
    {

        gulp.src(['./bower_components/angular/angular.js']).pipe(gulp.dest(rootPath+'/libs/angular'));

        gulp.src(['./bower_components/angular-animate/angular-animate.js']).pipe(gulp.dest(rootPath+'/libs/angular-animate'));
        gulp.src(['./bower_components/angular-route/angular-route.js']).pipe(gulp.dest(rootPath+'/libs/angular-route'));
        gulp.src(['./bower_components/angular-ui-bootstrap/src/**/.*']).pipe(gulp.dest(rootPath+'/libs/angular-ui-bootstrap/src'));
        gulp.src(['./bower_components/angular-ui-bootstrap/template/**/.*']).pipe(gulp.dest(rootPath+'/libs/angular-ui-bootstrap/template/'));
        gulp.src(['./bower_components/angular-ui-grid/ui-grid.css']).pipe(gulp.dest(rootPath+'/libs/angular-ui-grid'));
        gulp.src(['./bower_components/angular-ui-grid/ui-grid.js']).pipe(gulp.dest(rootPath+'/libs/angular-ui-grid'));
        gulp.src(['./bower_components/angular-ui-router/release/angular-ui-router.js']).pipe(gulp.dest(rootPath+'/libs/angular-ui-router/release'));
        gulp.src(['./bower_components/bootstrap/dist/**/*']).pipe(gulp.dest(rootPath+'/libs/bootstrap/dist'));
        gulp.src(['./bower_components/font-awesome/css/**/*']).pipe(gulp.dest(rootPath+'/libs/font-awesome/css'));
        gulp.src(['./bower_components/font-awesome/fonts/**/*']).pipe(gulp.dest(rootPath+'/libs/font-awesome/fonts'));
        gulp.src(['./bower_components/jquery/dist/jquery.js']).pipe(gulp.dest(rootPath+'/libs/jquery/dist'));

    }
    else{
        gulp.src(['./bower_components/angular/angular.min.js']).pipe(gulp.dest(rootPath+'/libs/angular'));
        gulp.src(['./bower_components/bootbox.js/bootbox.js']).pipe(gulp.dest(rootPath+'/libs/bootbox.js'));
        gulp.src(['./bower_components/angular-animate/angular-animate.min.js']).pipe(gulp.dest(rootPath+'/libs/angular-animate'));
        gulp.src(['./bower_components/angular-route/angular-route.min.js']).pipe(gulp.dest(rootPath+'/libs/angular-route'));
        gulp.src(['./bower_components/angular-ui-bootstrap/src/**/.*']).pipe(gulp.dest(rootPath+'/libs/angular-ui-bootstrap/src'));
        gulp.src(['./bower_components/angular-ui-bootstrap/template/**/.*']).pipe(gulp.dest(rootPath+'/libs/angular-ui-bootstrap/template/'));
        gulp.src(['./bower_components/angular-ui-grid/ui-grid.min.css']).pipe(gulp.dest(rootPath+'/libs/angular-ui-grid'));
        gulp.src(['./bower_components/angular-ui-grid/ui-grid.min.js']).pipe(gulp.dest(rootPath+'/libs/angular-ui-grid'));
        gulp.src(['./bower_components/angular-ui-router/release/angular-ui-router.min.js']).pipe(gulp.dest(rootPath+'/libs/angular-ui-router/release'));
        gulp.src(['./bower_components/bootstrap/dist/**/*']).pipe(gulp.dest(rootPath+'/libs/bootstrap/dist'));
        gulp.src(['./bower_components/font-awesome/css/**/*']).pipe(gulp.dest(rootPath+'/libs/font-awesome/css'));
        gulp.src(['./bower_components/font-awesome/fonts/**/*']).pipe(gulp.dest(rootPath+'/libs/font-awesome/fonts'));
        gulp.src(['./bower_components/jquery/dist/jquery.min.js']).pipe(gulp.dest(rootPath+'/libs/jquery/dist'));
    }


}


module.exports = copyVendor;