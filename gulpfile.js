'use strict';
var gulp = require('gulp');


// Sass
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/app'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.scss', gulp.series('sass'));
});



gulp.task('build:html', function () {
  return gulp.src('./src/app/**/*.html')
    .pipe(gulp.dest('./dist/app'))
})

// Default
gulp.task('default', gulp.parallel('sass'));