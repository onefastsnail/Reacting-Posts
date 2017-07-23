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
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var runSequence = require('run-sequence');

//some utils
var shell = require('gulp-shell');
var del = require('del');
var wait = require('gulp-wait');
var debug = require('gulp-debug');

var webpack = require('webpack');

var gulpTaskTimeout = 1;

var paths = {
    src: 'src/',
    dist: 'dist/',
    sass: {
        src: [
            'src/assets/scss/**/*.scss'
        ],
        dist: 'dist/assets/css/'
    },
    react: {
        app: 'src/assets/react/App.js',
        src: ['src/assets/react/**/*.js'],
        dist: 'dist/assets/react/'
    }
};

process.env.NODE_ENV = 'production';

gulp.task('clearBuild', function() {
    return del([paths.dist + '**/*']);
});

gulp.task('copy', ['sass', 'react'], function() {
    return gulp.src([paths.src + '**/*'], { read: true })
        .pipe(changed(paths.dist))
        .pipe(gulp.dest(paths.dist));
});

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

gulp.task('react', function (callback) {

    var webpackConfig = {
        entry: __dirname + '/' + paths.react.app,
        output: { path: __dirname + '/' + paths.react.dist, filename: 'bundle.js' },
        //plugins: [new webpack.optimize.UglifyJsPlugin()],
         stats: {
            colors: true,
            modules: true,
            reasons: true,
            errorDetails: true
        },
        module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-react-app']
                }
            }
        }]

        },
    };

    webpack(webpackConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }
        gutil.log('[webpack:build] Completed\n' + stats.toString({
            assets: true,
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            timings: false,
            version: false
        }));
        callback();
    });

});


/**
 * our watch tasks
 */
gulp.task('watch', [], function() {
    gulp.watch(paths.sass.src, ['sass']);
    gulp.watch(paths.react.src, ['react']);
});

/**
 * the default gulp task used for development
 */
gulp.task('default', function(callback) {
    runSequence('clearBuild', 'copy', 'watch', callback);
});

/**
 * the build task triggered when deploying, or making the project
 */
gulp.task('build', function(callback) {
    runSequence('clearBuild', 'copy', callback);
});