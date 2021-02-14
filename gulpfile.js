"use strict"

const gulp = require('gulp');
let sass = require('gulp-sass');
sass.compiler = require("node-sass");
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');

// ----------- Tasks -----------

gulp.task('default', watch);

gulp.task('sass', compilarScss);
gulp.task('minify', minificarHtml);
gulp.task('compress', comprimirJs);

gulp.task('build', gulp.series('sass', 'minify', 'compress'));

// ----------- Functions -----------

function compilarScss(){
  return gulp
  .src('*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('dist/style'));
}

function minificarHtml(){
  return gulp
  .src('*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('dist'));
}

function comprimirJs() {
  return gulp
  .src('./src/**/*.js')
  .pipe(terser())
  .pipe(gulp.dest('./dist/src'));
}

function watch(){
  gulp.watch('*.scss', compilar);
}