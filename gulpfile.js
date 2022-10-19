const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));


function css(done) {

  src('src/scss/app.scss') // Identify the file sass
    .pipe( sass() ) // Compile the sass file
    .pipe( dest('build/css') ); // Identify the destination folder


  done(); //this is the callback function that tells gulp that the task is complete
}

exports.css = css;