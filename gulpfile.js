const { src, dest, watch } = require('gulp');

const minify = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

const ngrok = require('ngrok');

const paths = {
    src: {
        css: './assets/src/css/**/*.scss',
        js: ''
    },
    dist: {
        css: './assets/dist/css',
        js: ''
    }
}

const compile = () => {
    return src(paths.src.css)
        .pipe(sass())
        .pipe(minify())
        .pipe(autoprefixer())
        .pipe(dest(paths.dist.css));
}

const observe = () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    watch(paths.src.css, compile);
    watch('./**/*.html').on('change', browserSync.reload);

   /*  browserSync.init({
        proxy: 'localhost',
        port: 8080,
        open: true, 
        notify: false 
    }, function (err, browserSync) { 
        ngrok.connect(browserSync.options.get('port'), function (err, url) { 
            // https://757c1652.ngrok.com -> 127.0.0.1:8080 
        });
    }); */
}

const open = () => {
    (async function() {
        const url = await ngrok.connect();
    })();
}

exports.sass = compile;
exports.watch = observe;
exports.open = open;

