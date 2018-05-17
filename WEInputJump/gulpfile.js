var gulp = require("gulp"),
    less = require("gulp-less"),
    autoprefixer = require("gulp-autoprefixer"),
    minify = require("gulp-clean-css"),
    minifyJS = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    rename = require("gulp-rename"),
    browser = require("browser-sync").create();

//Sincronización de pantallas
gulp.task('browser-sync', function() {
  browser.init({
    server: {
      baseDir: './'
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0'
      }
    },
    injectChanges: true
  });
});

gulp.task("bs-reload", function() {
  browser.reload();
});

//Actualización de los estilos CSS cuando guardemos
gulp.task('styles', function() {
  gulp.src('css/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(minify())
    .pipe(gulp.dest('css'))
    .pipe(browser.reload({
      stream: true
    }));
});

//Actualización de las funciones JS cuando guardemos
gulp.task('scripts', function() {
  //Zona administración
  gulp.src([
      'js/inputJump.js'
    ])
    .pipe(minifyJS())
    .pipe(rename("inputJump.min.js"))
    .pipe(gulp.dest('js/final'))
    .pipe(browser.reload({
      stream: true
    }));
});

gulp.task('default', ['styles', 'scripts', 'browser-sync'], function () {
    gulp.watch('css/*.less', ['styles']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('*.html', ['bs-reload']);
});
