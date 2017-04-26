const gulp = require("gulp");
const clean = require("gulp-clean");
const ts = require("gulp-typescript");
const watch=require("gulp-watch");
const tsProject = ts.createProject("tsconfig.json");


gulp.task('clean', function() {
    return gulp.src('build/*', {
            read: false
        })
        .pipe(clean());
});
gulp.task('build', ['clean'],function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("build"));
});
gulp.task('watch',['build'],function(){
    return watch('src/**/*.ts',function(){
        gulp.start('default');
    })
})

gulp.task('default',['clean','build','watch'])


