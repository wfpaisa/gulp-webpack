var path = require("path");
var gulp = require("gulp");
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');

var gutil = require("gulp-util");
var webpack = require("webpack");
// var WebpackDevServer = require("webpack-dev-server");

/* DEVELOPMEN */
	// Copia html en public
	gulp.task('copyHtml', function() {
	    gulp.src('./app/index.html')
	        .pipe(gulp.dest('./public/'))
	        .pipe(livereload());
	});

	// Copia los estilos en public
	gulp.task('copyCss',function(){
		gulp.src('./app/css/*')
			.pipe(gulp.dest('./public/css/'))
	})

	// Copia las imagenes en public
	gulp.task('copyImg',function(){
		gulp.src('./app/img/*')
			.pipe(gulp.dest('./public/img/'))
	})

	gulp.task('watch', function() {
	    livereload.listen();

	    // Javascripts
	    gulp.watch('./app/js/main.js', ['webpack']);

	    // Copia html
	    gulp.watch('./app/*.html', function(file) {

	        console.log(prueba(file))

	        gulp.src(file.path)
	            .pipe(gulp.dest('./public/'))
	            .pipe(livereload());
	    });

	    // Copia css
	    gulp.watch('./app/css/*.css', function(file) {
	        gulp.src(file.path)
	            .pipe(gulp.dest('./public/css/'))
	            .pipe(livereload());
	    });

	});

/* PRODUCCIÓN */
// Copia los estilos en public
gulp.task('copyCssProd',function(){
	gulp.src('./app/css/*')
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/css/'))
})

function prueba(file) {
    return file;
}




// Ejecutando webpack
gulp.task("webpack", function(callback) {
    webpack({
        entry: {
            app: ["./app/js/main.js"]
        },
        output: {
            path: path.resolve(__dirname, "public", "js"),
            publicPath: "/js/",
            filename: "bundle.js"
        }
    }, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);

        // Log stadisticas
        gutil.log("[webpack]", stats.toString({
            // output options
        }));

        // Reload navegador
        livereload.changed('public/js/main.js');

        callback();
    });
});


// gulp.task("default", function(callback) {
//     // Start a webpack-dev-server
//     var compiler = webpack({
//         entry: {
//             app: ["./app/js/main.js"]
//         },
//         output: {
//             path: path.resolve(__dirname, "public", "js"),
//             publicPath: "/js/",
//             filename: "bundle.js"
//         }
//     });

//     new WebpackDevServer(compiler, {
//     	contentBase: 'public/',
//     	// inline: true

//     }).listen(8080, "localhost", function(err) {
//         if (err) throw new gutil.PluginError("webpack-dev-server", err);
//         // Server listening
//         gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

//         // keep the server alive or continue?
//         // callback();
//     });
// });



// Tarea por defecto
gulp.task("default", ['copyHtml', 'copyCss', 'copyImg', 'webpack', 'watch']);




