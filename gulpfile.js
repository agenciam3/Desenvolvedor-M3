const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

gulp.task('serve',() => {
  browserSync.init({
      server: {
          baseDir:"./",
      },
      startPath: "/file-server/index.html"
  });
});

gulp.task('fileinclude', async ()=> {
  await gulp.src(['./Projeto/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./file-server'));
});

gulp.task("js", () => {
  return gulp.src("./Projeto/scripts/**").pipe(gulp.dest("./file-server/scripts"))
});

gulp.task("index", () => {
  return gulp.src("./Projeto/index.html").pipe(gulp.dest("./file-server"))
});


gulp.task("img",() => {
  return gulp.src("./Projeto/imagens/**").pipe(gulp.dest("./file-server/imagens"))
});

gulp.task("css", () => {
  return gulp.src("./Projeto/css/**").pipe(concat('style.css')).pipe(gulp.dest('./file-server'))
});
