var _ = require('lodash');
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var plumber = require('gulp-plumber');

var paths = {
    client: 'client',
    scripts: ['client/**/*.js', '!client/**/*.spec.js', '!client/bower_components/**/*'],
    unitTests: ['client/**/*.spec.js', '!client/bower_components/**/*.js'],
    scriptsAndUnitTests: null,
    allInjectables: ['client/**/*', '!client/**/*.html'],
    css: ['client/**/*.css', '!client/bower_components/**/*']
};
paths.scriptsAndUnitTests = _.flatten([paths.scripts, paths.unitTests]);

var tasks = {
    serve: function() {
        gulp.src(paths.client)
            .pipe(webserver({
                livereload: true,
                open: true
            }));
    },
    jshint: function () {
        gulp.src(paths.scriptsAndUnitTests)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));
    },
    inject: function() {
        gulp.src(paths.client + '/index.html')
            .pipe(inject(
                gulp.src(bowerFiles(), {read: false, base: paths.client + '/bower_components'}),
                {name: 'bower', relative: true}
            ))
            .pipe(inject(
                gulp.src(paths.scripts).pipe(plumber()).pipe(angularFilesort()),
                {relative: true}
            ))
            .pipe(inject(gulp.src(paths.css, {read: false}), {relative: true}))
            .pipe(gulp.dest(paths.client));
    }
};

gulp.task('default', ['jshint', 'inject', 'serve', 'watch']);
gulp.task('serve', tasks.serve);
gulp.task('jshint', tasks.jshint);
gulp.task('inject', tasks.inject);
gulp.task('watch', function() {
    gulp.watch(paths.scriptsAndUnitTests, ['jshint']);
    gulp.watch(paths.allInjectables, ['inject']);
});