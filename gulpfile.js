//Initialize Gulp
const gulp = require('gulp');

//Plugins
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const print = require('gulp-print');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concatCss = require('gulp-concat-css');

const inputDirPath = {
  jsFile: 'client/app/**/*.js',
  cssFile: 'client/css/**/*.css',
  viewFile: 'client/views/**/*.html',
  indexFile: 'client/index.html',
  assetFile: 'client/assets/**/*'
};

const outputDirPath = {
  jsFile: './public/js',
  cssFile: './public/css',
  viewFile: './public/views',
  indexFile: './public',
  assetFile: './public/assets'
};

//jsCombiner and translate and Linter
gulp.task('js:build', () => {
  return gulp.src(inputDirPath.jsFile)

    //Linting
    .pipe(jshint())
    .pipe(jshint.reporter('default'))

    //writing init
    .pipe(sourcemaps.init())

    .pipe(print()) //debug
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputDirPath.jsFile));
});

gulp.task('css:build', () => {
  return gulp.src(inputDirPath.cssFile)
    .pipe(print()) //debug
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest(outputDirPath.cssFile));
});

gulp.task('view:build', () => {
  return gulp.src(inputDirPath.viewFile)
    .pipe(print()) //debug
    .pipe(gulp.dest(outputDirPath.viewFile));
});

gulp.task('index:build', () => {
  return gulp.src(inputDirPath.indexFile)
    .pipe(print()) //debug
    .pipe(gulp.dest(outputDirPath.indexFile));
});

gulp.task('asset:build', () => {
  return gulp.src(inputDirPath.assetFile)
  .pipe(print()) //debug
  .pipe(gulp.dest(outputDirPath.assetFile));
});

gulp.task('watch', () => {
  gulp.watch(inputDirPath.jsFile, ['js:build']);
  gulp.watch(inputDirPath.cssFile, ['css:build']);
  gulp.watch(inputDirPath.viewFile, ['view:build']);
  gulp.watch(inputDirPath.indexFile, ['index:build']);
  gulp.watch(inputDirPath.assetFile, ['asset:build']);
});

//Default Task action
gulp.task('default', ['js:build', 'css:build', 'view:build', 'index:build', 'asset:build', 'watch']);