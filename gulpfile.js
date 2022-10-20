const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');


function css(done) {

  src('src/scss/**/*.scss') // Identify the file sass
    .pipe(plumber()) 
    .pipe( sass() ) // Compile the sass file
    .pipe( dest('build/css') ); // Identify the destination folder
  done(); //this is the callback function that tells gulp that the task is complete
}

function dev(done) {
  watch('src/scss/**/*.scss', css); // Watch the sass files and compile them
  done();
  console.log('Waiting changes, compiling SASS... For exit press CTRL+C');
}

exports.css = css;
exports.dev = dev;