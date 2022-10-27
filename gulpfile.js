const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// JavaScript
const terser = require('gulp-terser-js');


function css(done) {

  src('src/scss/**/*.scss') // Identify the file sass
    .pipe( sourcemaps.init() ) // Initialize the sourcemaps
    .pipe(plumber()) // Initialize the plumber
    .pipe( sass() ) // Compile the sass file
    .pipe( postcss([ autoprefixer(), cssnano() ]) ) // Add the prefixes and minify the file
    .pipe( sourcemaps.write('.') ) // Write the sourcemaps
    .pipe( dest('build/css') ); // Identify the destination folder
  done(); //this is the callback function that tells gulp that the task is complete
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3
  };
  src('src/img/**/*.{jpg,png}')
    .pipe( cache( imagemin( opciones ) ) )
    .pipe( dest('build/img') );
  done()
}

function versionWebp(done) {
  const opciones = {
    quality: 50
  };
  src('src/img/**/*.{jpg,png}')
    .pipe( webp( opciones ) )
    .pipe( dest('build/img') );
  done();
}

function versionAvif(done) {
  const opciones = {
    quality: 50
  };
  src('src/img/**/*.{jpg,png}')
    .pipe( avif( opciones ) )
    .pipe( dest('build/img') );
  done();
}

function javascript(done) {

  src('src/js/**/*.js')
    .pipe( sourcemaps.init() )
    .pipe( terser() )
    .pipe( sourcemaps.write('.') )
    .pipe( dest('build/js') );
  done();

}

function dev(done) {
  watch('src/scss/**/*.scss', css);
  watch('src/js/**/*.js', javascript); // Watch the sass files and compile them
  done();
  console.log('Waiting changes, compiling SASS... For exit press CTRL+C');
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);