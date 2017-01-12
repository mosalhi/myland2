
var elixir       =  require('laravel-elixir');
                    require('laravel-elixir-livereload');
var browserSync  =  require('browser-sync').create(),
    gulp         =  require('gulp'),
    sass         =  require('gulp-sass'),
    minify       =  require('gulp-minify-css'),
    concat       =  require('gulp-concat'),
    uglify       =  require('gulp-uglify'),
    rename       =  require('gulp-rename'),
    notify       =  require('gulp-notify'),
    growl        =  require('gulp-notify-growl');


var paths = {
    'dev': {
        'sass'  : './resources/assets/sass/',
        'js'    : './resources/assets/js/',
        'vendor': './resources/assets/vendor/'
    },
    'production': {
        'css'   : './public/assets/css/',
        'js'    : './public/assets/js/'
    }
};

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss').livereload();
});

// CSS
gulp.task('css', function() {
  return gulp.src(paths.dev.sass+'*.scss')

    .pipe(sass())
    .pipe(gulp.dest(paths.production.css))
    .pipe(minify({keepSpecialComments:0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.production.css))
});

// JS
gulp.task('js', function(){
  return gulp.src([
      paths.dev.vendor+'jquery/dist/jquery.js',
      paths.dev.vendor+'bootstrap/dist/js/bootstrap.js',
      paths.dev.js+'js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.production.js));
});
 // |--------------------------------------------------------------------------
// PHP Unit




 // |--------------------------------------------------------------------------





gulp.task('watch', function() {
  gulp.watch(paths.dev.sass + '/*.scss', ['css']);
  gulp.watch(paths.dev.js + '/*.js', ['js']);
  gulp.watch([
              paths.dev.js + '/*.js',
              paths.dev.sass + '/*.scss']).on('change', function () {
    browserSync.reload();
  });

});


gulp.task('scripts', ['clean'], function () {
      return gulp.src('js/*.js')
        .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
        .pipe(gulp.dest('minjs'));
  });


gulp.task('default', ['css','js','watch']);



