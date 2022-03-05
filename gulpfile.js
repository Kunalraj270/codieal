const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
// const { default: uglify } = require('rollup-plugin-uglify');
// const uglify = require('rollup-plugin-uglify').default;
const uglify = import('gulp-uglify-es');
const imagine = import('gulp-imagemin');
const del = require('del');

// minfication css 
gulp.task('css', function (done) {
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
    done()
});

// minification js
gulp.task('js', function (done) {
    console.log('minification js...');
    gulp.src('./assets/**/*.js')
        // .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
    done()
});

// minification images
gulp.task('images', function (done) {
    console.log('images minification....');
    gulp.src('./assets/**/*.+(png|jpg|gif|jepg|webp)')
        // .pipe(imagine())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
    done()
});

// empty the public/assets directory
gulp.task('clean:assets', function (done) {
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'images', 'js', function (done) {
    console.log('build');
    done();
}));

