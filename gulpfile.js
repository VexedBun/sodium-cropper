var project = require('./package.json');

var settings = {
    name:   project.name,
    src:    './src',
    build:  './build',
    vendor: './vendor'
};

var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    include         = require('gulp-include'),
    uglify          = require('gulp-uglify'),
    sass            = require('gulp-ruby-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    rename          = require('gulp-rename')
    plumber         = require('gulp-plumber');

var onError = function(err) {
    gutil.beep();
    console.log(err);
};

gulp.task('styles', function () {
    return sass(settings.src + '/sodium-cropper.scss', {
            style: 'compressed',
            sourcemap: false
        })
        .on('error', onError )
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(settings.build));
});

gulp.task('scripts', function () {
    gulp.src(settings.src + '/sodium-cropper.js')
        .pipe( plumber({
            errorHandler: onError
        }) )
        .pipe( include() )
        .pipe( uglify() )
        .pipe( rename({ suffix: '.min' }) )
        .pipe( gulp.dest(settings.build) );
});

gulp.task('default', ['styles', 'scripts']);
