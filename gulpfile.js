/**
* Dependencies
*/
var gulp = require('gulp'),
  prefixer = require('autoprefixer-core'),
  csswring = require('csswring'),
  concat = require('gulp-concat'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass'),
  htmlmin = require('gulp-htmlmin'),
  uglify = require('gulp-uglify');
 


// Compila los sass del proyecto
gulp.task('css', function() {
   return gulp.src(['./node_modules/chico/dist/ui/chico.css','./sass/global.scss'])
       .pipe(sass())
       .pipe(concat('bundle.css'))
       .pipe(postcss([
           require('autoprefixer-core')({
               browsers: ['last 8 versions', 'ie 8']
           }),
       ]))
       .pipe(postcss([
           require('csswring')({
               preserveHacks: true
           })
       ]))
       .pipe(gulp.dest('./dist/css/'));
});

gulp.task('js', function(){
  return gulp.src([
      './node_modules/tiny.js/dist/tiny.js',
      './node_modules/chico/dist/ui/chico.js',
      './js/global.js'
    ])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('html', function(){
  return gulp.src('./index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('img', function(){
  return gulp.src('./images/**/*')
    .pipe(gulp.dest('./dist/images/'))
});

gulp.task('fonts', function(){
  return gulp.src('./node_modules/chico/dist/assets/**/*')
    .pipe(gulp.dest('./dist/assets/'))
});

gulp.task('dist', ['html','js','css','img', 'fonts']);




gulp.task('watch', function() {
   gulp.start('dist');
   gulp.watch('./sass/*.scss', ['css']);
   gulp.watch('./*.html', ['html']);
   gulp.watch('./js/**/*.js', ['js']);
});