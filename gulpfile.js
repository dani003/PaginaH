const gulp =require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();
var reload = browserSync.reload;


gulp.task('styles', function(){
  gulp.src('./stylus/*.styl')
  .pipe(stylus())
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream());
});

gulp.task('pug', function buildHtml(){
  return gulp.src('./pug/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream());
});

gulp.task('serve', ['pug', 'styles'], function(){
  browserSync.init({
    server:"./"
  })
  gulp.watch("./pug/index.pug", ['pug']);
  gulp.watch("./pug/blocks/*.pug", ['pug']);
  gulp.watch("./stylus/*.styl", ['styles']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ["serve", "pug", "styles"]);
