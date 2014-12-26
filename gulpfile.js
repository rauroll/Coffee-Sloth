var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
autoprefixer = require('gulp-autoprefixer'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
cssmin = require('gulp-cssmin'),
htmlreplace = require('gulp-html-replace'),
htmlmin = require('gulp-htmlmin');

gulp.task('js', function () {
	return gulp.src(['js/library/*.js', 'js/util/*.js', 'js/scene/*.js', 'js/scene/game/section/*.js', 'js/scene/game/*.js', 'js/*.js'])
		.pipe(concat('everything.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/asset'));
});

gulp.task('css', function () {
	return gulp.src(['css/*.css'])
		.pipe(concat('everything.css'))
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(gulp.dest('build/asset'));
});

gulp.task('png', function () {
	return gulp.src(['asset/**/*.png'])
		.pipe(pngquant())
		.pipe(gulp.dest('build/asset'));
});

gulp.task('replace', function () {
	return gulp.src('index.html')
		.pipe(htmlreplace({
			js: 'asset/everything.js',
			css: 'asset/everything.css'
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('html', function () {
	return gulp.src('index.html')
		.pipe(htmlmin())
		.pipe(gulp.dest('build'));
});