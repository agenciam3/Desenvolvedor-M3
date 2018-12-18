var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

/* TOP LEVEL FUNCTIONS 

gulp.task - define tasks
gulp.src - point tofiles to use
gulp.dest - points to folder to output
gulp.watch - watch files and folders for changes

*/

// logs messagee

gulp.task('message', function (done) {
    return console.log('gulp is running...');
    done();
});

// copy html

gulp.task('copy', function (done) {
    gulp.src('src/*html')
        .pipe(gulp.dest('dist'));
    done();
});

// optimize images

gulp.task('imgmin', () =>
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);

// minify js

gulp.task('minify', function (done) {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    done();
})


// compile sass

gulp.task('sass', function (done) {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
    done();
});

// scripts cocat + minify

gulp.task('scripts', function () {

    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

});

gulp.task('default', ['message', 'copy', 'imgmin', 'sass', 'scripts']);

gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imgmin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copy']);
});