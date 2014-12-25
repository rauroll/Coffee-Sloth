var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
autoprefixer = require('gulp-autoprefixer'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
cssmin = require('gulp-cssmin');

gulp.task('js', function () {
	return gulp.src(['js/library/*.js', 'js/util/*.js', 'js/scene/*.js', 'js/scene/game/section/*.js', 'js/scene/game/*.js', 'js/*.js'])
		.pipe(concat('everything.js'))
		.pipe(uglify())
		.pipe(gulp.dest('production/asset'));
});

gulp.task('css', function () {
	return gulp.src(['css/*.css'])
		.pipe(concat('everything.css'))
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(gulp.dest('production/asset'));
});

gulp.task('png', function () {
	return gulp.src(['asset/**/*.png'])
		.pipe(pngquant())
		.pipe(gulp.dest('production/asset'));
});