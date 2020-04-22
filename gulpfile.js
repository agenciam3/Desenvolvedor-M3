const { src, dest, watch, parallel, series } = require("gulp");

const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sync = require("browser-sync").create();
const del = require('del');
const css_prefixer = require('gulp-autoprefixer');


function clean(cb) {
  del.sync('dist/**', { force: true });
  cb();
}


function generateCSS(cb) {
  src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(css_prefixer({
      cascade: false
    }))
    .pipe(dest('./dist/app'))
    .pipe(sync.stream());
  cb();
}


function generateHTML(cb) {
  src('./src/**/*.html')
    .pipe(dest('./dist/app'));
  cb();
}


function generateJS(cb) {
  src('./src/**/*.js')
    .pipe(dest('./dist/app'));
  cb();
}


function generateAssets(cb) {
  src('./src/assets/**/*')
    .pipe(dest('./dist/app/assets'))
  cb();
}

function importFontAwesome(cb) {
  src('./node_modules/@fortawesome/fontawesome-free/**/*')
    .pipe(dest('./dist/app/dependencies/fontAwesome'));
  cb();
}


function browserSync(cb) {
  sync.init({
    server: {
      baseDir: "./dist/app"
    }
  });
  watch('./src/**/*.html', generateHTML);
  watch('./src/**/*.scss', generateCSS);
  watch('./src/**/*.js', generateJS);
  watch('./src/assets/**/*', generateAssets);
  watch("./dist/**/*").on('change', sync.reload);
}


const loadDependences = parallel(importFontAwesome);
const build = series(clean, parallel(generateJS, generateCSS, generateHTML, generateAssets, loadDependences));

exports.build = build;
exports.serve = series(build, browserSync);
exports.fa = importFontAwesome;