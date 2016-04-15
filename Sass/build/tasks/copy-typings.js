var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// copies d.ts files from jspm and vs to a common folder - 'typings'
gulp.task('copy-typings', function () {
   return gulp.src([paths.jspmTypings])
     .pipe(gulp.dest('typings'));
});
