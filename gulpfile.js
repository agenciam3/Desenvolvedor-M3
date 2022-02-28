import path from "path";

import gulp from "gulp";
import webpack from "webpack";
import del from "del";
import autoprefixer from "gulp-autoprefixer";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from "gulp-sourcemaps";
import webpackConfig from "./webpack.config.js";
import browserSync  from "browser-sync"

const sass = gulpSass(dartSass);


const paths = {
  scripts: {
    src: "src/js/index.js",
    watch: "src/js/**/*.js",
  },
  styles: {
    src: "src/scss/main.scss",
  },
  img: {
    src: "src/img/**/*",
  },
  html: {
    src: "src/index.html",
  },
  dest: "dist",
  temp: ".tmp",
};

function clean() {
  return del([paths.dest, paths.temp]);
}

function server() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return new Promise((resolve) =>
    webpack(webpackConfig(paths), (err, stats) => {
      if (err) console.log("Webpack", err);

      console.log(
        stats.toString({
          all: false,
          modules: true,
          maxModules: 0,
          errors: true,
          warnings: true,
          moduleTrace: true,
          errorDetails: true,
          colors: true,
          chunks: true,
        })
      );

      resolve();
    })
  );
}

function html() {
  return gulp.src(paths.html.src).pipe(browserSync.stream()).pipe(gulp.dest(paths.dest));
}

function img() {
  return gulp.src(paths.img.src).pipe(gulp.dest(paths.dest + "/img"));
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, html, img));
const dev = () => {
  gulp.watch(paths.scripts.watch, { ignoreInitial: false }, scripts).on(
    "change",
    browserSync.reload
  );
  gulp.watch(paths.styles.src, { ignoreInitial: false }, styles);
  gulp.watch(paths.img.src, { ignoreInitial: false }, img);
  gulp.watch(paths.html.src, { ignoreInitial: false }, html).on(
    "change",
    browserSync.reload
  );
  server();
};

const _build = build;
export { _build as build };
const _server = server;
export { _server as server };
const _styles = styles;
export { _styles as styles };
const _scripts = scripts;
export { _scripts as scripts };
const _default = dev;
export { _default as default };
