const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

const js_folder = 'public/js'

gulp.task('js', (done) => {
    ['index.js'].map((entry) => {
        return browserify({
            entries: ['src/js/' + entry],
            transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
            debug: true
        })
            .bundle()
            .pipe(source(entry))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(js_folder))
    })
    done()
})