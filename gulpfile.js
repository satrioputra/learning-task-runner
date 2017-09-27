var gulp, sass, imageMin, sync, 
compress, browserSync, autoprefix,
gulpIf, uglify, gutil;

gulp = require('gulp');
sass = require('gulp-sass');
gulpIf = require('gulp-if');
gutil = require('gulp-util');
uglify = require('gulp-uglify');
compress = require('gulp-cssnano');
imageMin = require('gulp-imagemin');
autoprefix = require('gulp-autoprefixer');
browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('./assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('compress', function() {
  return gulp.src('./style.css')
    .pipe(autoprefix())
    .pipe(compress())
    .pipe(gulp.dest('./'))
});

gulp.task('compress-js', function(){
  return gulp.src('./assets/js/*.js')
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('./assets/production/js'))
});

gulp.task('compress-img', function(){
  return gulp.src('./assets/img/*.+(jpg|png|gif)')
    .pipe(imageMin())
    .pipe(gulp.dest('./assets/production/image'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watch-assets', function(){
  gulp.watch('./assets/scss/*.scss', ['sass']);
  gulp.watch('./style.css', ['compress']);
  gulp.watch('./assets/js/*.js', ['compress-js']);
  gulp.watch('./*.php', browserSync.reload);
  gulp.watch('./assets/js/*.js', browserSync.reload);
  gulp.watch('./assets/img/**/*.+(jpg|png|gif|svg)', ['compress-img']);
});