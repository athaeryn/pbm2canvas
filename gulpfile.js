var gulp = require('gulp')
var babel = require('gulp-babel')
var source = require('vinyl-source-stream')
var browserify = require('browserify')

var outDir = 'lib/'
var srcFiles = 'src/**/*.js'

gulp.task('babel', function () {
  return gulp.src(srcFiles)
    .pipe(babel())
    .pipe(gulp.dest(outDir))
})

gulp.task('babel-watch', function () {
  gulp.watch(srcFiles, ['babel'])
})

gulp.task('test', function () {
  return browserify('test/src/test.js', {
    transform: [[ 'babelify', { 'loose': 'all' }]]
  })
    .bundle()
    .pipe(source('test.js'))
    .pipe(gulp.dest('test/js/'))
})

gulp.task('test-watch', function () {
  gulp.watch('test/src/test.js', ['test'])
})

gulp.task('default', ['babel', 'babel-watch', 'test', 'test-watch'])

