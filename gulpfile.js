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

gulp.task('default', function() {
  return gulp.src('./assets/scss/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(gulp.dest('./'))
})

gulp.task('sass', function(){
  return gulp.src('./assets/scss/*.scss')
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('compress', ['compress-css', 'compress-js', 'compress-img']);

gulp.task('compress-css', function() {
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
    .pipe(imageMin({optimizationLevel: 8}))
    .pipe(gulp.dest('./assets/production/image'))
});

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./assets/scss/*.scss', ['sass']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('watch-assets', function(){
  gulp.watch('./assets/scss/*.scss', sass({outputStyle: 'compact'}));
  gulp.watch('./*.php', browserSync.reload);
  gulp.watch('./assets/js/*.js', browserSync.reload);
});