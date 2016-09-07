var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleancss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var del = require('del');

var APP = 'app/';
var TMP = 'tmp/';
var DIST = 'dist/';
var HTML = 'dist/views/';

var vendorScripts = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/a0-angular-storage/dist/angular-storage.min.js',
    'bower_components/angular-loading-bar/build/loading-bar.min.js',
    'bower_components/ng-prettyjson/dist/ng-prettyjson.min.js'
];

var styles = [
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/angular-loading-bar/build/loading-bar.min.css',
    'bower_components/ng-prettyjson/dist/ng-prettyjson.min.css',
    'app/css/**/*.css'
];

var fonts = [
    'bower_components/bootstrap/dist/fonts/**/*'
];

gulp.task('default', ['clean'], function () {
    gulp.start('scripts', 'styles', 'fonts', 'angularjs', 'partials');
});

gulp.task('scripts', function () {
    return gulp.src(vendorScripts)
        .pipe(gulp.dest(TMP + 'js'))
        .pipe(concat('vendors.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(DIST + 'js/'));
});

gulp.task('styles', function () {
    return gulp.src(styles)
        .pipe(cleancss({ keepSpecialComments: 0 }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(DIST + 'css/'));
});

gulp.task('fonts', function () {
    return gulp.src(fonts)
        .pipe(gulp.dest(DIST + 'fonts/'));
});

gulp.task('angularjs', function () {
    var angular = [
        APP + 'app.js',
        APP + 'config.js',
        APP + 'controllers/*.js',
        APP + 'services/*.js',
        APP + 'directives/*.js',
    ];
    return gulp.src(angular)
        .pipe(concat('app.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(DIST + 'js/'));
});

gulp.task('partials', function () {
    return gulp.src(APP + 'partials/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(HTML));
});

gulp.task('clean', function (cb) {
    return del([
        DIST + 'js/**/*.js',
        DIST + 'css/**/*.css',
        DIST + 'fonts/**/*',
        HTML + '**/*.html',
    ]);
});

gulp.task('watch', function () {
    // Watch .css files
    gulp.watch(APP + 'css/**/*.css', ['styles']);
    // Watch .js files
    gulp.watch(APP + '**/*.js', ['angularjs']);
    // Watch view files
    gulp.watch(APP + 'partials/**/*.html', ['partials']);
});
