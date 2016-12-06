"use strict";

const connect = require('gulp-connect');
const connectHistory = require('connect-history-api-fallback');
const del = require('del');
const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('webpack:build', () => {
  return gulp.src('src/js/main.js')
    .pipe(webpack(Object.assign({},
      webpackConfig, {
        watch: false
      })))
    .pipe(gulp.dest('public/js/'))
});

gulp.task('webpack:watch', () => {
  return gulp.src('src/js/main.js')
    .pipe(webpack(Object.assign({},
      webpackConfig, {
        watch: true
      }
    )))
    .pipe(gulp.dest('public/js/'))
    .pipe(connect.reload());
});

gulp.task('clean', done => {
  del('./public/**/*').then(() => {
    done()
  });
});

gulp.task('serve', () => {
  connect.server({
    livereload: true,
    root: 'public',
    middleware: (connect, opt) => {
      return [
        connectHistory()
      ];
    }
  });
});

gulp.task('build:index', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('build:less', () => {
  return gulp.src('./src/css/main.less')
    .pipe(less())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('build', done => {
  runSequence(
    'clean',
    ['webpack:build', 'build:index', 'build:less'],
    done
  );
});

gulp.task('watch', done => {
  runSequence(
    'clean',
    ['webpack:watch', 'serve', 'build:index', 'build:less'],
    done
  );
});

gulp.task('default', ['build']);
