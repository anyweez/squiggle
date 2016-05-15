/* jslint node: true */
'use strict'
let gulp = require('gulp');
let del = require('del');
// let babel = require('gulp-babel');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let browserify = require('gulp-browserify');
let typescript = require('gulp-typescript');
let tslint = require('gulp-tslint');
let concat = require('gulp-concat');

let project = typescript.createProject('tsconfig.json');

gulp.task('default', ['html', 'dist', 'css']);

/**
 * Convert Typescript into raw Javascript. All output goes into a temporary
 * directory; nothing in public/ changes. Should be followed up by `gulp dist`.
 */
gulp.task('js', function () {
    let result = project.src().pipe(typescript(project));
    
    return result.js
        .pipe(gulp.dest('tmp/js'));
});

gulp.task('dist', ['js'], function () {
    return gulp.src('./tmp/js/main.js')
        .pipe(browserify())
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('clean', function() {
    del('tmp');
});

gulp.task('html', function() {
    gulp.src('./templates/*.html')
        .pipe(gulp.dest('./public/templates/'));

    return gulp.src('./*.html')
        .pipe(gulp.dest('./public'));
});

gulp.task('css', function () {
    gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});

// gulp.task('watch', ['default'], function() {
//     gulp.watch('./*.html', ['html']);
//     gulp.watch('./js/*.ts', ['ts']);
//     gulp.watch('./js/*/*.ts', ['ts']);
//     gulp.watch('./scss/*.scss', ['css']);
// })