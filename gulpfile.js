"use strict"

const gulp = require('gulp');
let sass = require('gulp-sass');
sass.compiler = require("node-sass");

gulp.task('default', watch);
gulp.task('sass', compilar);

function compilar(){
  return gulp
    .src('*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/style'));
}

function watch(){
  gulp.watch('*.scss', compilar);
}