# stage_7_developer_roadmap 

# *GULP*
______________
* src() — берем исходные файлы.
* pipe() — передаем их в плагин для трансформации.
* dest() — сохраняем результат.
______________
* Популярные плагины: 
* gulp-sass (компиляция SCSS в CSS).
* gulp-autoprefixer (автоматические префиксы для CSS).
* gulp-clean-css (минификация CSS).
* gulp-uglify (минификация JS).
* gulp-imagemin (сжатие картинок).
* browser-sync (запуск сервера с живой перезагрузкой).
______________
* gulp.series() и gulp.parallel() для управления порядком задач
______________
* watch(), которая перезапускает задачи при изменении файлов.
______________
* exports.html = html;
* exports.styles = styles;
* exports.scripts = scripts;
______________
const build = parallel(html, styles, scripts);
exports.build = build;
______________
exports.default = series(build, serve);
______________
browserSync.init({
        server: {
            baseDir: './dist' // Указываем, что корень сервера - папка dist
        },
        port: 3000
    });

```
Установка нового плагина:
npm i --save-dev имя-плагина

Добавление в gulpfile:
1. const плагин = require('имя-плагина');
2. В задаче: .pipe(плагин())

Структура задачи:
function имяЗадачи() {
    return src('откуда')
        .pipe(трансформация1())
        .pipe(трансформация2())
        .pipe(dest('куда'))
        .pipe(browserSync.stream()); // только для CSS/JS
}

Запуск:
gulp имяЗадачи   — одна задача
gulp build       — сборка
gulp             — разработка (default)
```

* Внутри CMD
```
gulp - если был задан. Запускает то, что было задано в exports.default 
gulp html - отдельная сборка
```
______________
# *WebPack*
______________
