const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const nunjuncks = require('gulp-nunjucks-render');


gulp.task('sass', function () {
    gulp.src('./scss/*')
    .pipe(sass())
    // .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('js', function () {
    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'
    ])
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('fonts', function () {
    gulp.src('./node_modules/bootstrap-sass/assets/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('images', function() {
    gulp.src('./images/**/*')
    // .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('templates', function () {
    gulp.src('./templates/**/*.html')
    .pipe(nunjuncks({
        path: ['./templates']
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
})

gulp.task('watch', ['browserSync', 'sass', 'templates', 'images'], function () {
    gulp.watch('./scss/*', ['sass']);
    gulp.watch('./templates/**/*.html', ['templates', browserSync.reload])
    gulp.watch('./images/**/*', ['images', browserSync.reload])
});

gulp.task('default', ['watch']);