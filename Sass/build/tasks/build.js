var gulp = require("gulp");
//var gulpprint = require("gulp-print");
var runSequence = require("run-sequence");
var args = require("yargs").argv;

//var changed = require("gulp-changed");
//var plumber = require("gulp-plumber");
var to5 = require("gulp-babel");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var paths = require("../paths");
var babelOptions = require("../babel-options");
var tsOptions = require("../typescript-options");
var assign = Object.assign || require("object.assign");
//var notify = require("gulp-notify");
var browserSync = require("browser-sync");
//var minify = require("gulp-minify");
var $ = require("gulp-load-plugins")({ lazy: true });


// transpiles changed es6 files to SystemJS format
// the plumber() call prevents "pipe breaking" caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task("build-system", function () {
   return gulp.src([paths.source, paths.typings])
     .pipe($.plumber({ errorHandler: $.notify.onError("Error: <%= error.message %>") }))
     .pipe($.changed(paths.output, { extension: ".ts" }))
     .pipe(sourcemaps.init({ loadMaps: true }))
     .pipe(ts(tsOptions))
     //.pipe(to5(assign({}, babelOptions, { modules: "system" })))
     .pipe(sourcemaps.write({ includeContent: true }))
     .pipe(gulp.dest(paths.output));
});

gulp.task("js", function() {
   return gulp
      .src(paths.js)
      .pipe($.jshint())
     // .pipe(minify({exclude: ["tasks"], ignoreFiles:["aurelia.js","-min.js"]}))
     // .pipe($.concat())
      .pipe($.uglify())
      .pipe(gulp.dest(paths.output));
});

gulp.task("vet", function () {
   return gulp
      .src(paths.js)
      .pipe($.print())   //can use gulp-if to do this based on args
    //  .pipe($.jscs())
      .pipe($.jshint())
      .pipe($.jshint.reporter($.styleish, { verbose: true }))
      .pipe($.jshint.reporter("fail"))
   ;
});


// copies changed html files to the output directory
gulp.task("build-html", function () {
   return gulp.src(paths.html)
     .pipe($.changed(paths.output, { extension: ".html" }))
     .pipe(gulp.dest(paths.output));
});

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var del = require('del');
gulp.task('styles', ['clean-styles'], function () {
   var processors =[
        autoprefixer({browserSync: ['last 2 version', '> 5%']})
       // , cssnano
   ];
   log('styles');
   gulp.src(paths.sass)
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.postcss(processors))
      .pipe(gulp.dest(paths.output + 'css/'));
   //.pipe(gulp.dest('./css/'));
});

gulp.task('clean-styles', function () {

   log(clean(paths.output + '/css/app.css'));
});

// copies changed css files to the output directory
gulp.task("build-css", ['styles'], function () {
   return gulp.src(paths.css)
     .pipe($.changed(paths.output, { extension: ".css" }))
     .pipe(gulp.dest(paths.output))
     .pipe(browserSync.stream());
});

gulp.task("copy-nanoscroller", function () {
   return gulp.src([paths.nanoscroller + '**/*.css', paths.nanoscroller + '**/*.js'])
     .pipe(gulp.dest(paths.output))
     .pipe(browserSync.stream());
});

gulp.task("copy-sourcefiles", ['copy-javascripts'], function () {
   return gulp.src([paths.content + '**/*.*', paths.bootstrapSrc + '**/*.*', '!' + paths.bootstrapSrc + 'stylesheets', '!' + paths.bootstrapSrc + 'stylesheets/**', '!' + paths.bootstrapSrc + 'javascripts', '!' + paths.bootstrapSrc + 'javascripts/**'])
     .pipe(gulp.dest(paths.output + 'content'))
     .pipe(browserSync.stream());
});

gulp.task("copy-javascripts", function () {
   return gulp.src([paths.root + 'javascripts/*.*', paths.root + 'javascripts/**/*.*', paths.bootstrapSrc + 'javascripts/*.*', paths.bootstrapSrc + 'javascripts/**/*.*'])
     .pipe(gulp.dest(paths.output + 'javascripts'))
     .pipe(browserSync.stream());
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task("build", function (callback) {
   return runSequence(
     "clean",
     ["build-system", "build-html", "build-css", "copy-nanoscroller", "js", "copy-sourcefiles"],
    // "bundle",
     callback
   );
});


function clean(path) {
   log('Cleaning ' + path);

   return del.sync(path);
}

function log(msg) {
   if (typeof (msg) === 'object') {
      for (var item in msg) {
         if (msg.hasOwnProperty(item)) {
            $.util.log($.util.colors.blue(msg[item]));
         }
      }
   } else {
      $.util.log($.util.colors.blue(msg));
   }
}