const {src, dest, watch, series} = require('gulp');

const jsonServer = require('json-server');
const open = require('gulp-open');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

const sourceJS = './src/scripts';
const sourceCSS = './src/styles';
const target = './dist';

const server = jsonServer.create();
const middlewares = jsonServer.defaults({
    static: target
});
const router = jsonServer.router('./dist/assets/data/products.json');

function runServer() {
    server.use(middlewares);
    server.use(router);
    server.listen(5555);
}

function openBrowser() {
    return src(target)
        .pipe(open({
            uri: 'http://localhost:5555',
            app: 'firefox'
        }));
}

function optimizeJS() {
    return src(`${sourceJS}/*.js`)
        .pipe(babel({presets: ['@babel/preset-env']}))
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest(target));
}

function optimizeCSS() {
    return src(`${sourceCSS}/*.css`)
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(dest(target));
}

function optimizeImages() {
    return src('./layout/imagens/*.png')
        .pipe(imagemin())
        .pipe(dest(`${target}/assets/images`));
}

function trackChanges() {
    watch(`${sourceJS}/*.js`, {ignoreInitial: false}, optimizeJS);
    watch(`${sourceCSS}/*.css`, {ignoreInitial: false}, optimizeCSS);
    watch('./layout/imagens/*.png', {ignoreInitial: false}, optimizeImages);
}

exports.track = trackChanges;
exports.execute = series(openBrowser, runServer);
