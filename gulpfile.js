const { src, dest, watch, parallel, series } = require("gulp");

const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sync = require("browser-sync").create();



function generateCSS(cb) {
  src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/app'))
    .pipe(sync.stream());
  cb();
}


function generateHTML(cb) {
  src('./src/**/*.html')
    .pipe(dest('./dist/app'));
  cb();
}


function generateAssets(cb) {
  src('src')
  .pipe(dest('./dist/app'))
}


function browserSync(cb) {
  sync.init({
    server: {
      baseDir: "./dist/app"
    }
  });
  watch('./src/**/*.html', generateHTML);
  watch('./src/**/*.scss', generateCSS);
  watch("./dist/**/*").on('change', sync.reload);
}



exports.scss = generateCSS;
exports.assets = generateAssets;
exports.html = generateHTML;
exports.serve = browserSync;