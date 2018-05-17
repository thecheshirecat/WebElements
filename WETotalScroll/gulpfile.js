var gulp = require("gulp"),
    less = require("gulp-less"),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require("gulp-sourcemaps"),
    browser = require("browser-sync").create();

//Sync screens
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

//Refresh screen
gulp.task("bs-reload", function() {
    browser.reload();
});
//Update CSS when saving
gulp.task('styles', function() {
    gulp.src('css/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(browser.reload({stream:true}));
});

//Defult
gulp.task('default', ['styles', 'browser-sync'], function() {
    gulp.watch('css/**/*.less', ['styles']);
    gulp.watch('**/*.html', ['bs-reload']);
});