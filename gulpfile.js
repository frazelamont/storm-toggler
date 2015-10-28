/*global require*/
/* Require the gulp and node packages */
var gulp = require('gulp'),
    pkg = require('./package.json'),
    header = require('gulp-header'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ghPages = require('gulp-gh-pages'),
    browserify = require('gulp-browserify'),
    runSequence = require('run-sequence');


/* Set up the banner */
var banner = [
    '/**',
    ' * @name <%= pkg.name %>: <%= pkg.description %>',
    ' * @version <%= pkg.version %>: <%= new Date().toUTCString() %>',
    ' * @author <%= pkg.author %>',
    ' * @license <%= pkg.license %>',
    ' */'
].join('\n');

/* Error notificaton*/
var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
    })(err);

    this.emit('end');
};

/************************
 *  Task definitions 
 ************************/
gulp.task('js', function() {
    return gulp.src('src/*.js')
		.pipe(header(banner, {pkg : pkg}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('build', ['js'], function() {
    return gulp.src('dist/storm.toggler.js')
		.pipe(uglify())
  		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('copy', ['default'], function() {
    return gulp.src('dist/*.js')
		.pipe(gulp.dest('example/src/libs/'));
});

gulp.task('example', function() {
    return gulp.src('example/src/app.js')
		.pipe(browserify({
          insertGlobals : true,
          debug : true
        }))
		.pipe(gulp.dest('example/js'));
});
 
gulp.task('deploy', ['example'], function() {
  return gulp.src('./example/**/*')
    .pipe(ghPages());
});


/************************
 *  Task collection API
 ************************/
gulp.task('default', ['build']);