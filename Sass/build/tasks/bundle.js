var gulp = require('gulp');
//var bundler = require('aurelia-bundler');
var bundles = require('../bundles.json');

var config = {
   force: true,   // Force overwrite bundle file if already exists. Default false
   baseURL: '.',  // baseURL of the application
   packagePath: '.',
   configPath: '../config.js',
   bundles: bundles.bundles
};

gulp.task('bundle', function () {
   //return bundler.bundle(config);
});

gulp.task('unbundle', function () {
   //return bundler.unbundle(config);
});
