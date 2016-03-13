var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    minifyImage = require('gulp-imagemin'),
    watch = require('gulp-watch');;

// CSS Styles
gulp.task('style', function() {
	gulp.src('css/style.css')
		.pipe(minifyCSS())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('../dist/css'));
});

// Scripts
gulp.task('scripts', function() {
	gulp.src('js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('../dist/js'));
});

gulp.task('scripts-external', function() {
        gulp.src(['bower_components/jquery/dist/jquery.min.js',
		  'bower_components/knockout/dist/knockout.js'])
                .pipe(uglify())
                .pipe(gulp.dest('../dist/js'));
});

gulp.task('scripts-map', function() {
        gulp.src('js/map.js')
                .pipe(uglify())
                .pipe(rename('map.min.js'))
                .pipe(gulp.dest('../dist/js'));
});

gulp.task('scripts-foursquare-api', function() {
	gulp.src(['js/foursquare.js'])
		.pipe(uglify())
		.pipe(rename('foursquare.min.js'))
		.pipe(gulp.dest('../dist/js'));
});

gulp.task('scripts-instagram-api', function() {
	gulp.src(['js/instagram.js'])
		.pipe(uglify())
		.pipe(rename('instagram.min.js'))
		.pipe(gulp.dest('../dist/js'));
});

gulp.task('scripts-nytimes-api', function() {
	gulp.src(['js/nytimes.js'])
		.pipe(uglify())
		.pipe(rename('nytimes.min.js'))
		.pipe(gulp.dest('../dist/js'));
});

gulp.task('scripts-history', function() {
	gulp.src(['js/history.js'])
		.pipe(uglify())
		.pipe(rename('history.min.js'))
		.pipe(gulp.dest('../dist/js'));
});


//Files
gulp.task('files', function() {
	gulp.src(['index.html'])
		.pipe(gulp.dest('../dist/'))
});

//Images
gulp.task('images', function() {
	gulp.src(['image/**/*'])
		.pipe(minifyImage({
			progressive: true,
			svgoPlugins: [{removeViewbox: false}]
		}))
		.pipe(gulp.dest('../dist/image'))
});

// Watch
gulp.task('watch', function() {
	gulp.watch('image/**/*', ['images']);
	gulp.watch('index.html', ['files']);
	gulp.watch('js/app.js', ['scripts']);
	gulp.watch('js/map.js', ['scripts-map']);
	gulp.watch('js/foursquare.js', ['scripts-foursquare-api']);
	gulp.watch('js/instagram.js', ['scripts-instagram-api']);
	gulp.watch('js/nytimes.js', ['scripts-nytimes-api']);
	gulp.watch('css/style.css', ['style']);
});


// Default
gulp.task('default',
	['style',
	 'scripts',
	 'scripts-external',
	 'scripts-map',
	 'scripts-foursquare-api',
	 'scripts-instagram-api',
	 'scripts-nytimes-api',
	 'scripts-history',
	 'files',
	 'images',
	 'watch']
);
