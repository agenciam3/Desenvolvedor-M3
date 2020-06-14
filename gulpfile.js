// Inicializa modulos
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
// const babel = require('gulp-babel');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
 
const files = {
  scssPath: 'scss/main.scss',
  cssDest: 'dist/css',
  jsPath: 'js/app.js',
  jsDest: 'dist/js'
}
function scssTask() {

  return gulp.src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(files.cssDest))
    .pipe(browserSync.stream()
    );
}

function jsTask() {
  return gulp.src([
    files.jsPath,
  ])
    .pipe(concat('app.min.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(gulp.dest(files.jsDest)
    );
}

//  Cachebusting task
// function CacheBustTask() {
//   let cbString = new Date().getTime();
//   return gulp.src(['media/templates/shared/base.html'])
//     .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
//     .pipe(gulp.dest('media/templates/shared/'))
// }

// Watch task
function watchTask() {
  
  gulp.watch('scss/**/*.scss', scssTask).on('change', browserSync.stream);
  gulp.watch('index.html').on('change', browserSync.reload);
  gulp.watch('js/app.js', jsTask);

}

// Default task
exports.default = gulp.series(
  scssTask,
  jsTask,
  // CacheBustTask,
  watchTask
);