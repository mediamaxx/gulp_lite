
/* 
 * Для сборки проекта должна быть следующая структура папок:
 * src/main.html - основной html файл
 * src/img/ - 
 * src/js/ - 
 * src/less/ - 
 * 
 * Собирается проект в папку build
 * 
 * Библиотеки:
 * http://dimsemenov.com/plugins/magnific-popup/documentation.html#including-files
 * https://daneden.github.io/animate.css/
 * 
 * Определяем переменные 
 */

var   gulp = require('gulp'),
      less = require('gulp-less'), // Компилятор less
      concat = require('gulp-concat'),  // Склейка файлов
      rename = require('gulp-rename'), // Переименовывание
      notify  = require('gulp-notify'),
      prefix  = require('gulp-autoprefixer'), // Автопрефиксер
      minifyCss = require('gulp-clean-css'), // Минификация CSS
      imagemin = require('gulp-imagemin'), // Минификация CSS
      html = require('gulp-htmlmin'), // Минификация html 
      uglify = require('gulp-uglify'); // Минификация JS;
      browsersync = require('browser-sync'); // Минификация JS;

/* Создаем задачи */	

/* Задача css-libs. Запускается командой "gulp css-libs" */ 
gulp.task('css-libs', function () {
  return gulp.src([
    './bower_components/magnific-popup/dist/magnific-popup.css',
    './bower_components/animate.css/animate.min.css',
    ])
    .pipe(concat("bundle.css"))
    .pipe(minifyCss())
    .pipe(rename('libs.min.css'))
    .pipe(gulp.dest('./build/'))
    .pipe(browsersync.reload({stream: true})) // Обновляем 
    .pipe(notify('gulp css-libs -> done!'));
          
});
/* Задача js-libs. Запускается командой "gulp js" 
bower install jqeury 
bower install waypoints
bower install magnific-popul
bower install animate-css
*/ 
gulp.task('js-libs', function () {
  return gulp.src([
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
    './bower_components/waypoints/lib/jquery.waypoints.min.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/libs/'))
    .pipe(browsersync.reload({stream: true})) // Обновляем 
    .pipe(notify('gulp js-libs -> done!'));
         
});

 
/* Задача less. Запускается командой "gulp less" */ 
gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(concat("bundle.css"))
    .pipe(prefix('last 15 versions'))
    .pipe(minifyCss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./build/'))
    .pipe(browsersync.reload({stream: true})) // Обновляем 
    .pipe(notify('gulp less -> done!'));
          
}); 

 
/* Задача js. Запускается командой "gulp js" */	
gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
    .pipe(concat('common.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'))
    .pipe(browsersync.reload({stream: true})) // Обновляем 
    .pipe(notify('gulp common js -> done!'));
         
});

// Задача "images". Запускается командой "gulp images"
gulp.task('images', function() {
    gulp.src('./src/img/**/*') // берем любые файлы в папке и ее подпапках
    .pipe(imagemin()) // оптимизируем изображения для веба
    .pipe(gulp.dest('./build/img/')) // результат пишем по указанному адресу
    .pipe(browsersync.reload({stream: true})) // Обновляем 
    .pipe(notify('gulp images -> done!'));
            
});

// Задача "html". Запускается командой "gulp html"
gulp.task('html', function() {
    gulp.src('./src/*.html') // берем любые файлы в папке и ее подпапках
    // .pipe(html({collapseWhitespace: true})) // оптимизируем изображения для веба
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./build/')) // результат пишем по указанному адресу
    .pipe(browsersync.reload({stream: true})) // Обновляем 
    .pipe(notify('gulp html -> done!'));

});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browsersync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'build' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});


gulp.task('watch', ['browser-sync', 'html', 'css-libs', 'js-libs'], function() {
	// При изменение файлов *.less в папке "less" и подпапках запускаем задачу less
	gulp.watch('./src/less/**/*.less', ['less'])
	// При изменение файлов *.js папке "javascripts" и подпапках запускаем задачу js
	gulp.watch('./src/js/**/*.js', ['js']) 
	// При изменение любых файлов в папке "images" и подпапках запускаем задачу images
	gulp.watch('./src/img/**/*', ['images']);
	// При изменение любых файлов .html в папке "src" и подпапках запускаем задачу html
	gulp.watch('./src/*.html', ['html']);
})