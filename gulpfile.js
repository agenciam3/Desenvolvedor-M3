const gulp = require("gulp");
const webpack = require("webpack");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const imagemin = require('gulp-imagemin');
const cssnano = require("cssnano");
const del = require("del");

sass.compiler = require("node-sass");

const paths = {
  sass: {
    src: "./src/scss/**/*.scss",
    dest: "./src/css/"
  },
  styles: {
    src: "./src/css/*.css",
    dest: "./assets/css"
  },
  images: {
    src: "./layout/imagens/**",
    dest: "./assets/img"
  },
  scripts: {
    src: "./src/js/**"
  }
};

function clean() {
  return del(["assets"]);
}

function buildCss() {
  return gulp
    .src(paths.sass.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.sass.dest));
}

function postCss() {
  var plugins = [
    autoprefixer({
      browsers: ["last 1 version", "> 1%", "not dead"],
      grid: "autoplace"
    }),
    cssnano()
  ];
  return gulp
    .src(paths.styles.src)
    .pipe(postcss(plugins))
    .pipe(
      rename({
        basename: "main",
        suffix: ".min"
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))
}

function scripts(cb) {
  return webpack(require("./webpack.config"), () => {
    cb();
  });
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.sass.src, buildCss);
  gulp.watch(paths.styles.src, postCss);
}

const build = gulp.series(clean, buildCss, postCss, images, scripts);

exports.clean = clean;
exports.sass = buildCss;
exports.css = postCss;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.images = images;

exports.default = build;