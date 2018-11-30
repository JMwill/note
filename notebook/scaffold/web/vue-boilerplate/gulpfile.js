const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const buffer = require('vinyl-buffer');
const spritesmith = require('gulp.spritesmith');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

/**
 * 路径变量定义区域
 */
const spritesPath = path.join(__dirname, 'src/assets/sprites');
const spritesCssPath = path.resolve(spritesPath, '../css');
const nospritesImgPath = path.resolve(spritesPath, '../img');
const staticCssPath = path.join(__dirname, 'static/css');
const staticImgPath = path.join(__dirname, 'static/img');

/**
 * Spritesmith 对象工厂, 用来给定名称来创建需要的 spritesmith对象
 *
 * @param {String} [name='/img']
 * @returns {Object:spritesmith}
 */
function genSpritesmithObj(name, imgPath = '/img') {
    return spritesmith({
        imgName: `${name}_icon.png`,
        imgPath: `${path.resolve(imgPath, `${name}_icon.png`)}`,
        cssName: `_${name}_icon.scss`,
    });
}

/**
 * Imagemin 对象工厂, 用来给定名称来创建需要的 imagemin对象
 *
 * @param {number} [level=7]
 * @returns {Object:imagemin}
 */
function genImageminObj(opt) {
    let finalOpt = Object.assign({}, {
        optimizationLevel: 7, // 类型: Number, 默认: 3, 优化等级为: 0 ~ 7
        use: [pngquant()], // 这里使用 pngquant 深度压缩 png 图片的 imagemin 插件
    }, opt);
    return imagemin(finalOpt);
}

/**
 * 为雪碧图文件夹下的每个子文件夹定义一个任务
 * 能够在某个子文件夹有修改的时候单独对其进行
 * 修改
 *
 * @example 子文件夹生成的任务: sprites:子文件夹名
 * @example 雪碧图根文件夹生成的任务: sprites:app
 */
(function collectSpritesTask(dir) {
    // 获取雪碧图文件夹内部包含的文件/文件夹
    let dirDetail = fs.readdirSync(dir);

    // 获取所有包含文件的子文件夹, 不考虑递归
    // 因为子文件内再有子文件夹的话组成上会变
    // 复杂, 没有必要, 可以抽取到上一层
    let subDirs = dirDetail.filter(
        (d) => {
            let subDirPath = path.resolve(dir, d);
            return fs.lstatSync(subDirPath).isDirectory()
                   && fs.readdirSync(subDirPath).length;
        });

    // 将 sprites 根目录的任务名称跟 gulp 源对象对应上
    let spritesData = {
        app: gulp.src(path.resolve(dir, '*.png'))
                .pipe(genSpritesmithObj('app')),
    };

    // 汇集所有的 sprites 任务
    spritesData =
    Object.assign.apply(null,
        subDirs.map((d) => { // 将 sprites 子目录的任务名称跟 gulp 源对象对应上
            let taskName = `sprites:${d}`;
            let gulpObj = {};

            gulpObj[taskName] =
                gulp.src(path.resolve(dir, d, '*.png'))
                    .pipe(genSpritesmithObj(d));
            return gulpObj;
        }).concat(spritesData)); // 添加将根目录的任务

    // 定向所有 sprites 任务的 css 输出路径
    // 压缩所有 sprites 任务的 png 图片, 并指定输出路径
    Object.keys(spritesData)
        .forEach((d) => {
            spritesData[d].css
                .pipe(gulp.dest(spritesCssPath));

            spritesData[d].img
                .pipe(buffer())
                .pipe(genImageminObj())
                .pipe(gulp.dest(staticImgPath));

            gulp.task(d, () => spritesData[d]);
        });

    // 注册 sprites 任务, 其任务是运行所有子任务
    gulp.task('sprites', Object.keys(spritesData), cb => cb());
}(spritesPath));

/**
 * 不执行 sprites 任务, 只单独对使用雪碧图
 * 的 scss 文件进行处理并输出到静态文件夹下
 */
gulp.task('scss:only', () =>
    gulp.src(path.resolve(spritesCssPath, '*.scss'))
        .pipe(sass({
            outputStyle: 'compressed',
        }).on('error', sass.logError))
        .pipe(gulp.dest(staticCssPath)));

/**
 * 监听使用雪碧图的 scss 文件所在的文件夹
 * 执行 scss:single 任务
 */
gulp.task('watch:scss', () => gulp.watch(path.resolve(spritesCssPath, '*.scss', ['scss:only'])));

/**
 * 定义 scss 任务, 需要等待 sprites 任务
 * 执行完成, 然后再执行 scss:only 任务
 */
gulp.task('scss', ['sprites'], () => gulp.start('scss:only'));

/**
 * 对资源文件夹下的 img 目录下的 png 文件
 * 进行压缩处理并输出到静态文件夹下
 */
gulp.task('img', () =>
    gulp.src(path.resolve(nospritesImgPath, '*.png'))
        .pipe(buffer())
        .pipe(genImageminObj())
        .pipe(gulp.dest(staticImgPath)));

gulp.task('default', ['img', 'sprites', 'scss']);
