let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let cleanCSS = require('gulp-clean-css');



// teste

gulp.task('message', function (done) {
    return console.log('gulp is running...');
    done();
});

// html

gulp.task('copy', function (done) {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    done();
});

// otimizar imagens

gulp.task('imgmin', () =>
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);

// minificar js

// gulp.task('minify', function (done) {
//     gulp.src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
//     done();
// })


// compilar concatenar e minificar sass/css

var plugins = [
    autoprefixer({
        browsers: ['last 1 version']
    })
];

gulp.task('sass', function (done) {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(postcss(plugins))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/css'));
    done();
});

// gulp.task('css', function (done) {
//     gulp.src('src/sass/*.css')
//         .pipe(concat('desktop.css'))
//         .pipe(postcss(plugins))
//         .pipe(cleanCSS({
//             compatibility: 'ie8'
//         }))
//         .pipe(gulp.dest('dist/css'));
//     done();
// });

// concatenar e minificar js

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
    gulp.watch('src/sass/*.css', ['css']);
    gulp.watch('src/*.html', ['copy']);
});