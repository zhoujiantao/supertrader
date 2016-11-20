var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");


var buildSass = function(rootPath,dev){
    var stream = gulp.src('./src/style/dist.scss');

    if(!dev)
    {
        stream.pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError));
        stream.pipe(rename(function (path) {
            path.extname = ".min.css"
        }));



    }
    else{
        stream.pipe(sass.sync().on('error',sass.logError));




    }
    stream.pipe(gulp.dest(rootPath+'/style'));

}


module.exports = buildSass;
