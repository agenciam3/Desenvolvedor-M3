let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let cleanCSS = require('gulp-clean-css');

/* TOP LEVEL FUNCTIONS 

gulp.task - define tasks
gulp.src - point tofiles to use
gulp.dest - points to folder to output
gulp.watch - watch files and folders for changes

*/

// logs message

gulp.task('message', function (done) {
    return console.log('gulp is running...');
    done();
});

// copy html

gulp.task('copy', function (done) {
    gulp.src('src/*.html')
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


// compile concat and minify sass/css

var plugins = [
    autoprefixer({
        browsers: ['last 1 version']
    })
];

gulp.task('sass', function (done) {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(postcss(plugins))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
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