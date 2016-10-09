'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

gulp.task('sass:compile', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('es6-translate',function () {
   gulp.src('./es6/**/*.js').pipe(babel({
       presets: ['es2015']
   }))
       .pipe(gulp.dest('./js'))
});

gulp.task('default', function () {
    gulp.run('watch');
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass:compile']);
    gulp.watch('./es6/**/*.js', ['es6-translate']);
});
