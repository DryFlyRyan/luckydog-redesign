var gulp = require('gulp');
var minify = require('gulp-minify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('serve', ['sass', 'compress', 'build-ready'], function() {

	browserSync.init({
			server: {
					baseDir: "./build"
			}
	});

	gulp.watch("./src/style/*.scss", ['sass']);
	gulp.watch("./src/script/*.js", ['compress']);
	gulp.watch("./*.html", ['build-ready'])
	gulp.watch("./*.html").on('change', browserSync.reload);

});

gulp.task('build-ready', function() {
	return gulp.src('./*.html')
		.pipe(gulp.dest('./build'));
});

gulp.task('compress', function () {
	return gulp.src('./src/script/*.js')
		.pipe(minify())
		.pipe(gulp.dest('./build/script'));
});

gulp.task('sass', function() {
    return gulp.src("./src/style/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./build/style"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
