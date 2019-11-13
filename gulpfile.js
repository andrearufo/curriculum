var paths = {
    styles: {
        src: '*.scss',
        dest: '.'
    }
};

var gulp = require('gulp');
var log = require('fancy-log');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var notify = require('gulp-notify');

function styles(done) {
    log.info('Starting styles!');
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on('error', notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'Styles error!'
            }))
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write('.'))
            .pipe( gulp.dest(paths.styles.dest) )
            .pipe(notify('Complete styles!'))
    );
	done();
}
exports.styles = styles;

function watch(){
    log.info('Starting watch!');
    gulp.watch(paths.styles.src, gulp.series('styles'));
}
exports.watch = watch;

exports.build = gulp.parallel(styles);

function start(){
    watch();
}
exports.default = start;
