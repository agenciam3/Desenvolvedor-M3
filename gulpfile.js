const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
 
gulp.task('fileinclude', async ()=> {
  await gulp.src(['./Pages/Index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});