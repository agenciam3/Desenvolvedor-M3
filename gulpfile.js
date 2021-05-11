const project_name = 'site-ucam';
var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// CLEAN DIRs
gulp.task('clean-css', gulp.series(function(){
    return gulp.src('./dist/css/*', {read: false})
    //.pipe(clean());
}));
gulp.task('clean-js', gulp.series(function(){
    return gulp.src(['./dist/js/*'], {read: false})
    //.pipe(clean());
}));
gulp.task('clean-img', gulp.series(function(){
    return gulp.src(['./dist/images/*'], {read: false})
    //.pipe(clean());
}));
gulp.task('clean-html', gulp.series(function(){
    return gulp.src(['./dist/*'], {read: false})
    //.pipe(clean());
}));

gulp.task('clean-data', gulp.series(function(){
    return gulp.src(['./dist/*'], {read: false})
    //.pipe(clean());
}));

// JS
gulp.task('js', gulp.series(['clean-js'], function(){
    return gulp.src([
        './src/js/**/*.js'
    ])
    .pipe(replace('.min.js', '.js'))
    .pipe(minify({
        ext: {
            min: '.min.js'
        },
        ignoreFiles: ['-min.js']
    }))
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({ stream: true }));
}));

// SASS
gulp.task('sass', gulp.series(['clean-css'], function() {
    return gulp.src([
        './src/scss/*.scss'
    ])
    .pipe(sass())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }));
}));

// IMAGES
gulp.task('images', gulp.series(['clean-img'], function() {
    return gulp.src([
            './src/images/**/*'
        ])
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
        .pipe(reload({ stream: true }));
}));


gulp.task('html', gulp.series(['clean-html'], function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }));
        
}));

gulp.task('data', gulp.series(['clean-data'], function() {
    var filesToMove = [
        './src/js/ASP/data/products.json'
    ];
    return gulp.src(filesToMove, { base: './src' })
    .pipe(gulp.dest('dist'));
        
}));



// START SERVER: gulp
    gulp.task('default', gulp.series(['js', 'sass', 'images', 'html', 'data'], function() {

    gulp.watch("./src/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("./src/images/**/*", gulp.series('images'));
    gulp.watch("./src/js/**/*.js", gulp.series('js'));
    gulp.watch("./src/**/*.html", gulp.series('html'));
    gulp.watch("./src/**/*.json", gulp.series('data'));

    browserSync.init({
        notify: false,
        server: {
            watch: false,
            baseDir: "./dist"
        }
    });
}));
