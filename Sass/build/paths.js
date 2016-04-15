var appRoot = 'src/';
var outputRoot = 'dist/';

module.exports = {
   root: appRoot,
   source: appRoot + '**/*.ts',
   js: appRoot + '**/*.js',
   html: appRoot + '**/*.html',
   bootstrapSrc: 'node_modules/bootstrap-sass/assets/',
   css: appRoot + '**/*.css',
   style: 'styles/**/*.css',
   content: appRoot + 'content/',
   output: outputRoot,
   typings: 'typings/**/*.d.ts',
   jspmTypings: 'jspm_packages/npm/**/*.d.ts',
   vsTypings: 'scripts/typings/**/*.d.ts',
   nanoscroller: 'node_modules/nanoscroller/bin/',
   sass: 'content/app.scss'
};
