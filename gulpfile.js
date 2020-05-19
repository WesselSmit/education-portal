  const gulp = require('gulp')
  const requireDir = require('require-dir')('build-scripts')

  const sass = 'src/scss/**/*.scss'
  const js = 'src/js/**/*.js'

  gulp.task('default', gulp.parallel('sass', 'js'))

  gulp.task('watch', () => {
      gulp.watch(sass, gulp.series('sass'))
      gulp.watch(js, gulp.series('js'))
  })