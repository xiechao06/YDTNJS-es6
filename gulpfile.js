var gulp = require('gulp');
var changed = require('gulp-changed');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var del = require('del');
var spawn = require('child_process').spawn;
var insert = require('gulp-insert');

gulp.task('compile', () => {
    gulp.src('ch?/*.js').pipe(changed('dist'))
    .pipe(insert.prepend('import { install } from \'source-map-support\';\ninstall();\n'))
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.', { 
        sourceRoot: path.join(__dirname, 'es6')
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['compile', 'watch', 'auto-execute']);

gulp.task('watch', () => {
    gulp.watch('ch?/*.js', ['compile']);
});


gulp.task('clean', () => {
  return del('dist');
});

gulp.task('auto-execute', () => {
    gulp.watch('dist/ch?/*.js', (event) => {
         console.log('File ' + event.path + ' was ' + event.type); 
         spawn('node', [event.path], {
             stdio: 'inherit'
         });
    });
});
