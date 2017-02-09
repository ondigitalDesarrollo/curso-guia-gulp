const gulp 					= require('gulp'),
	  	sass 					= require('gulp-sass'),
	  	pump					= require('pump'),
	  	uglify				= require('gulp-uglify'),
	  	browserSync		= require('browser-sync').create(); 


// Evento para automatizar el browser
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

		// gulp.watch('file', ['tarea1', 'tarea2', 'tarea3'] ]);
    gulp.watch('./app/js/*.js', ['comprimir']);
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Convertir a Sass
gulp.task('sass', () => {
	return gulp.src('./scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./app/css/'))
	.pipe(browserSync.stream());
});

// Evento para minificar archivos js
gulp.task('comprimir', (cb) => {
	pump([
			gulp.src('app/js/*'),
			uglify(),
			gulp.dest('app/js/dist')
	],cb);
});




