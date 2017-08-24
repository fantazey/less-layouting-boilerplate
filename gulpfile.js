const gulp = require( 'gulp' );
const less = require( 'gulp-less' );
const csso = require( 'gulp-csso' );
const rename = require( 'gulp-rename' );
const cssBase64 = require( 'gulp-css-base64' );
const concat = require( 'gulp-concat' );
const connect = require( 'gulp-connect' );

gulp.task( 'hello', function() {
  console.log( 'hello world!' );
} );

gulp.task( 'process-less', function() {
  return gulp.src( 'src/less/**/*.less' )
    .pipe(less())
    .pipe(gulp.dest('src/css'))
} );

gulp.task( 'concat-css', function() {
  return gulp.src( 'src/css/**/*.css' )
    .pipe( concat( 'main.css' ) )
    .pipe(cssBase64())
    .pipe( gulp.dest( 'dst/css' ) );
} );

gulp.task( 'optimize-css', function() {
  return gulp.src( 'dst/css/main.css' )
    .pipe( csso() )
    .pipe( rename( 'main.min.css' ) )
    .pipe( gulp.dest( 'dst/css' ) );
} );

gulp.task( 'connect', function() {
    connect.server( {
        host: 'localhost',
        root: 'src',
        livereload: true,
        port: 4500
    } )
} );

gulp.task( 'html', function() {
    gulp.src( './src/index.html' )
        .pipe( connect.reload() );
} );

gulp.task( 'watch', function() {
    gulp.watch( [ './src/index.html', './src/less/**/*.less'], [ 'css', 'html' ] );
} );

gulp.task( 'css', ['process-less', 'concat-css', 'optimize-css' ] );

gulp.task( 'default', [ 'connect', 'watch' ] );