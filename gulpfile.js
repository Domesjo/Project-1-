const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const flatten = require('gulp-flatten');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');

gulp.task('sass', ()=>{
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8'}))
    .pipe(plumber())
    .pipe(flatten())
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload());
});


gulp.task('default',()=>{
  livereload.listen();
  //gulp.watch('src/**/*.js',['es6']);
  gulp.watch('src/**/*.scss', ['sass']);
});
