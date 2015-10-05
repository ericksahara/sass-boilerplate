'use strict';

var gulp        = require('gulp');
var compass     = require('gulp-compass');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

//js
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');

// svgstore
var svgstore    = require('gulp-svgstore');
var svgmin      = require('gulp-svgmin');

gulp.task('compass', function() {
  gulp.src('assets/stylesheets/sass/main.scss')
  .pipe(compass({
    config_file: './config.rb',
    css: 'dist/css',
    sass: 'assets/stylesheets/sass'
  }).on('error', function(e){
    console.log(e);
  }))
  .pipe(gulp.dest('dist/css'))
  .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {

  // if php
  browserSync({
    watchTask: true,
    proxy: 'localhost/sass-boilerplate'
  });

  // if static
  // browserSync({
  //       server: {
  //           baseDir: "./"
  //       }
  //   });

});

// Reload all Browsers
gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('uglify',['concat'], function() {
  gulp.src('dist/js/all.js')
  .pipe(uglify('all.min.js'))
  .pipe(gulp.dest('dist/js'))
});

gulp.task('concat', function() {
  return gulp.src([
  	'bower_components/almond/almond.js',
  	'bower_components/jquery/dist/jquery.js',
  	'assets/javascripts/vendor/*.js',
  	'assets/javascripts/pages/**/*.js',
  	'assets/javascripts/sectionInitializer.js',
    'assets/javascripts/app.js'
    ])
  .pipe(concat('all.js'))
  .pipe(gulp.dest('dist/js'))
});

// SVG
gulp.task('svgstore', function () {
  return gulp
  .src('dist/svg-icons/icons/*.svg')
  .pipe(svgmin({
    js2svg: {
      pretty: true
    }
  }))
  .pipe(svgstore())
  .pipe(gulp.dest('dist/svg-icons'));
});

// Default task to be run with `gulp`
gulp.task('watch', ['compass', 'browser-sync'], function () {
  gulp.watch(["assets/stylesheets/sass/**/*.scss"], ['compass']);
  gulp.watch("assets/javascripts/**/*.js", ['concat', 'uglify']);
  gulp.watch("*.php", ['bs-reload']);
});


