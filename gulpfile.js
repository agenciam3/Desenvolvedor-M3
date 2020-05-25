const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

gulp.task('serve',() => {
  browserSync.init({
      server: {
          baseDir:"./",
      },
      startPath: "/file-server/Index.html"
  });
});

gulp.task('fileinclude', async ()=> {
  await gulp.src(['./Projeto/Pages/Index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./file-server'));
});

gulp.task("js", () => {
  return gulp.src("./Projeto/JS/**").pipe(gulp.dest("./file-server/js"))
});

gulp.task("img",() => {
  return gulp.src("./Projeto/imagens/**").pipe(gulp.dest("./file-server/imagens"))
});

gulp.task("css", () => {
  return gulp.src("./Projeto/CSS/*").pipe(concat('style.css')).pipe(gulp.dest('./file-server'))
});
