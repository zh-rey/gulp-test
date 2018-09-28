//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), // 本地安装gulp所用到的地方
    less = require('gulp-less'), // less编译
    sass = require('gulp-sass'), // sass编译
    cssMin = require('gulp-clean-css'), // css压缩
    jsMin = require('gulp-uglify'), // js压缩
    ejs = require('gulp-ejs'), // ejs模板编译
    imageMin = require('gulp-imagemin'), //图片压缩
    sourcemaps = require('gulp-sourcemaps'), //生成sourcemap文件
    changed = require('gulp-changed'), // 仅仅传递更改过的文件
    rename = require('gulp-rename'), //文件重命名
    concat = require('gulp-concat'), //文件合并
    changed = require('gulp-changed'),// 仅仅传递更改过的文件
    clean = require('gulp-clean'), //文件清除
    connect = require('gulp-connect'), //web服务器
    sequence = require('gulp-sequence'), //按顺序执行任务
    cache = require('gulp-cache'), //图片缓存
    notify = require('gulp-notify'), //更改错误提示
    fileinclude = require('gulp-file-include'), //文件引入
    plumber = require('gulp-plumber'); //出现异常并不终止watch事件

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径

var paths = {
    js: ['src/js/*.js','src/js/*/*.js'],
    less: ['src/less/*.less','src/less/*/*.less'],
    sass:['src/sass/*.sass','src/sass/*/*.sass','src/sass/*.scss','src/sass/*/*.scss'],
    html: ['src/*.html','src/html/*.html','src/html/*/*.html'],
    img: ['src/img/*/*.{jpg,png,gif}','src/img/*.{jpg,png,gif}']
};
var dist_paths = {
    js:'dist/js',
    css:'dist/css',
    html:'dist',
    img:'dist/image'
};

//定义livereload任务
gulp.task('connect', function () {
	connect.server({
		root: './',
		port: 8086,
		livereload: true
	});
});

// gulp.task('distCss', function () {//less编译及压缩
//     return gulp.src(paths.less)
//     	.pipe(changed(dist_paths.css))
//     	.pipe(plumber())//{errorHandler:notify.onError('Error:<%=error.message%>')}
//     	.pipe(sourcemaps.init())
//         .pipe(less())
//         .pipe(gulp.dest('dist/css'))
//         .pipe(cssMin({keepBreaks: true}))
//         .pipe(rename({ extname: '.min.css' }))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest(dist_paths.css))
//         .pipe(connect.reload());
// });

gulp.task('distCss', function () {//sass编译及压缩
    return gulp.src(paths.sass)
    	.pipe(changed(dist_paths.css))
    	.pipe(plumber())//{errorHandler:notify.onError('Error:<%=error.message%>')}
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(cssMin({keepBreaks: true}))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(concat('style.min.css'))//合并压缩
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dist_paths.css))
        .pipe(connect.reload());
});

gulp.task('distJs',function(){//js压缩
	return gulp.src(paths.js)
		.pipe(changed(dist_paths.js))
    	.pipe(sourcemaps.init())
        .pipe(gulp.dest('dist/js'))
        .pipe(jsMin())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dist_paths.js))
        .pipe(connect.reload());
});

gulp.task('imagesMin',function(){//图片压缩
	return gulp.src(paths.img)
		.pipe(changed(dist_paths.img))
        /*.pipe(imageMin({
            optimizationLevel: 4, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: false //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))*/
        .pipe(gulp.dest(dist_paths.img))
        .pipe(connect.reload());
});

gulp.task('distHtml',function(){
    return gulp.src(paths.html,{base:'src'})
        //.pipe(changed(dist_paths.html))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(dist_paths.html))
        .pipe(connect.reload());
});

//输出common文件
gulp.task('common',function(){
    return gulp.src(['src/common/*/*','src/common/*/*/*','src/common/*/*/*/*','!src/common/*/*.less','!src/common/*/*.sass'],{read:'false',base:'src'})
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});
// gulp.task('commonLess',function(){
// 	return gulp.src('src/common/*/*.less',{base:'src'})
// 		.pipe(changed('dist'))
// 		.pipe(plumber())//{errorHandler:notify.onError('Error:<%=error.message%>')}
//     	.pipe(sourcemaps.init())
//         .pipe(less())
//         .pipe(gulp.dest('dist'))
//         .pipe(cssMin({keepBreaks: true}))
//         .pipe(rename({ extname: '.min.css' }))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('dist'))
//         .pipe(connect.reload());
// });
gulp.task('commonSass',function(){
	return gulp.src(['src/common/*/*.scss','src/common/*/*.sass'],{base:'src'})
		.pipe(changed('dist'))
		.pipe(plumber())//{errorHandler:notify.onError('Error:<%=error.message%>')}
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
        .pipe(cssMin({keepBreaks: true}))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

// 执行gulp的时候先clean下
gulp.task('clean', function(){
    return gulp.src('./dist', {read: false})
        .pipe(clean({force: true}));
});

//自动监听文件变化
gulp.task('watch',['connect'],function(){
    gulp.watch(paths.html, ['distHtml']);
    gulp.watch(paths.js, ['distJs']);
    gulp.watch(paths.sass, ['distCss']);
    gulp.watch(paths.img, ['imagesMin']);
    gulp.watch(['src/*.html','src/common/*/*'], ['common']);
    gulp.watch(['src/common/*/*.scss','src/common/*/*.sass'], ['commonSass']);
});

gulp.task('init',['clean'],function(){
	gulp.start(['common','commonSass','distCss','distJs','distHtml','imagesMin']);
});

gulp.task('default',['clean','init','watch'],function(){//定义默认任务
	console.log('\n'+'------------------监听中-------------');
    console.log('\n' + '－－－－－－－请不要关闭CMD窗口－－－－－－－' + '\n');
});
