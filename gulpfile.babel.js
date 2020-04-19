const gulp = require('gulp'),
terser = require('gulp-terser'),
uglifys = require('gulp-uglify-js'),
sass = require('gulp-sass'),
imagemin = require('gulp-imagemin'),
webpack = require('webpack'),
browserSync = require('browser-sync').create();


const config = {
  styles: {
    src: './src/styles/*.scss',
    dist: './assets/styles/'} ,
  
  scripts: {
     
      src: './src/scripts/*.js',
      dist: './assets/js/'
    },
    images: {
      src: './layout/imagens/*',
      dist:  './assets/img/'
    }
  };
  

function style() {
  return gulp.src(config.styles.src)
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(gulp.dest(config.styles.dist))
  .pipe(browserSync.stream());
}

function image() {
  return gulp.src('./layout/imagens/*')
    
    .pipe(imagemin())
    .pipe(gulp.dest(config.images.dist))
    
}


function minijs() {
  return gulp.src(config.scripts.src)
    .pipe(terser())
    .pipe(gulp.dest(config.scripts.dist))
    
  .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 8080,
    startPath: 'index.html'
  });
  
  gulp.watch('./src/styles/*.scss', style);
  gulp.watch('./src/scripts/*.js', minijs);
  gulp.watch('./layout/imagens/*', image);

  gulp.watch(['./*.html','./bundle.js']).on('change', browserSync.reload);

  gulp.watch('./src/scripts/*.js').on('change', browserSync.reload);
  gulp.watch('./src/styles/*.scss').on('change', browserSync.reload);
}
const build = gulp.series(style, minijs,image, gulp.parallel( watch));

exports.build = build;
exports.minijs = minijs;
exports.style = style;
exports.image = image;
exports.watch = watch;