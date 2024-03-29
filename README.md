# Проект: Место
## Описание проекта
Mesto: интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки.

https://disath1554.github.io/mesto-project


## Реализация

* Использована адаптивная вёрстка: ширина зоны с содержимым  меняется вместе с шириной окна браузера. Минимальная ширина: 320px (одна карточка в ряд). Максимальная: 1280px (три карточки в ряд).
* При загрузке на странице  6 карточек, добавленные с помощью JavaScript. 
* При создании карточек  используется template , описанный в index.html.
* Реализованно три диалоговых окна — «Редактировать профиль», «Обновить аватар»  и «Создать карточку».
* Форма редактирования профиля — подгружает информацию о пользователе в соответствующие поля и обновляет информацию на странице.
* Форма создания карточки позволяет добавить на страницу фотографию с подписью.
* Карточки можно лайкать и удалять.
* Все интерактивные элементы обладают состоянием наведения или фокуса.
* Функциональность реализована через взаимодействие с сервером посредством API-сервиса.
## Файлы
* HTML, CSS, JS-файлы и изображения в папке src;
* стили подключены в файле index.css в папке src/pages;
* стили организованы по методологии БЭМ в директории src/blocks ;
* папка src/images содержит изображения;
* файлы скриптов index.js , validate.js , card.js , modal.js , utils.js в папке src/components;
* файл .gitignore с исключениями node_modules и dist.
* readme

## Webpack настроен
* установлены webpack , webpack-cli и webpack-dev-server ;
* настроены сборки build и dev ;
* созданы скрипты в package.json ;
* настроена минификация и транспиляция JS-бабелем. Webpack собирает весь JavaScript в один файл и автоматически добавляет в HTML тег script со ссылкой на него;
* настроена обработка CSS;
* настроена минификация CSS и автоматическое добавление вендорных префиксов;
* настроена обработка изображений и шрифтов.



