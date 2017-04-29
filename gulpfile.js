var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var changed = require('gulp-changed');
var cache = require('gulp-cached');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');
var wait = require('gulp-wait');

//for react
var buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

var gulpTaskTimeout = 200;

//global build paths
var paths = {
    sass: {
        src: ['./assets/css/scss/**/*.scss'],
        dist: './assets/dist/css/'
    },
    js: {
        src: ['./assets/js/*.js', './assets/js/components/*.js'],
        dist: './assets/dist/js/'
    },
    react: {
        app: './assets/react/App.js',
        src: ['./assets/react/**/*.js'],
        dist: './assets/dist/react/'
    }
};

/**
 * compile, prefix and minify our sass
 */
gulp.task('sass', [], function() {
    return gulp.src(paths.sass.src)
        .pipe(wait(gulpTaskTimeout))
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie9' }))
        //.pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.sass.dist));
});

/**
 * compile, uglify and concat our js
 */
gulp.task('js', [], function() {
    return gulp.src(paths.js.src)
        .pipe(wait(gulpTaskTimeout))
        //.pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('myquery.js'))
        .pipe(uglify())
        //.pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.js.dist));
});

/*
    compile and browserify our React components
 */
gulp.task('react', function() {
    return browserify(paths.react.app)
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    //.pipe(sourcemaps.init())
    //.pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.react.dist));
});

/*
    Watch our project files for changes
 */
gulp.task('watch', [], function() {
    gulp.watch(paths.js.src, ['js']);
    gulp.watch(paths.sass.src, ['sass']);
    gulp.watch(paths.react.src, ['react']);
});

gulp.task('default', function(callback) {
  runSequence('react', 'sass', 'js', 'watch', callback);
});