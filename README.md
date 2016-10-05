# gulp_lite
Упрощённая сборка Gulp: concat + rigger + autoprefixer + browser-sync

Список плагинов:
var   gulp = require('gulp'),

      less = require('gulp-less'), // Компилятор less
      
      concat = require('gulp-concat'),  // Склейка файлов
      
      rename = require('gulp-rename'), // Переименовывание
      
      notify  = require('gulp-notify'), // Оповещение об успешной задаче
      
      prefix  = require('gulp-autoprefixer'), // Автопрефиксер
      
      browsersync = require('browser-sync'); // Litereload + синхронизация действий
      
      
 * Для сборки проекта должна быть следующая структура папок:
 * src/*.html - основной html файл
 * src/img/ - картинки
 * src/js/ - 
 * src/less/ - 
 * 
 * Собирается проект в папку build
