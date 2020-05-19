 const gulp = require('gulp')
 const sass = require('gulp-sass')
 const sourcemaps = require('gulp-sourcemaps')
 const sassGlob = require('gulp-sass-glob')
 const cleanCSS = require('gulp-clean-css')

 const styles = 'src/scss/master.scss'
 const css_folder = 'public/css'

 gulp.task('sass', () => {
     return gulp.src(styles)
         .pipe(sourcemaps.init())
         .pipe(sassGlob())
         .pipe(sass())
         .pipe(cleanCSS())
         .pipe(sourcemaps.write('./'))
         .pipe(gulp.dest(css_folder))
 })