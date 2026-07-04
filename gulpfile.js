// Импорт Gulp-функций
const { src, dest, series, parallel, watch } = require('gulp');

// Импорт плагинов
const sass = require('gulp-sass')(require('sass')); // Новая инициализация для gulp-sass
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create(); // Создаем экземпляр сервера

// --- ЗАДАЧИ ДЛЯ ОБРАБОТКИ ФАЙЛОВ ---

// 1. HTML
function html() {
    return src('src/*.html') // Все HTML-файлы в корне src
        .pipe(dest('dist/'))
        .pipe(browserSync.stream()); // Уведомить сервер об изменении HTML
}

// 2. Стили (SCSS -> CSS)
function styles() {
    return src('src/scss/**/*.scss') // Любые .scss файлы в src/scss/ и подпапках
        .pipe(sass().on('error', sass.logError)) // Компиляция SCSS, не падать при ошибке
        .pipe(autoprefixer()) // Автопрефиксы
        .pipe(cleanCSS()) // Минификация CSS (закомментируй для отладки)
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream()); // Внедряем CSS без перезагрузки всей страницы
}

// 3. JavaScript
function scripts() {
    return src('src/js/**/*.js')
        .pipe(uglify()) // Минификация JS
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

// --- ЗАДАЧА ЗАПУСКА СЕРВЕРА ---

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist' // Указываем, что корень сервера - папка dist
        },
        port: 3000
    });

    // Наблюдение за изменениями файлов
    watch('src/*.html', html);        // Если HTML изменился -> запустить задачу html
    watch('src/scss/**/*.scss', styles); // Если SCSS изменился -> запустить styles
    watch('src/js/**/*.js', scripts); // Если JS изменился -> запустить scripts
}

// --- ЭКСПОРТ ЗАДАЧ ---

// Задачи по отдельности (для отладки)
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;

// "Собрать проект" - последовательность или параллельность
// series(html, styles, scripts) - выполнит по очереди
// parallel(html, styles, scripts) - выполнит всё одновременно (быстрее)
const build = parallel(html, styles, scripts);
exports.build = build;

// "Запустить и работать" (команда по умолчанию gulp)
exports.default = series(build, serve);