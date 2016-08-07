'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass:compile', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('default', function () {
    gulp.run('sass:compile');
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass:compile']);
});
