# Mesto - React SPA
<p align="center">
  <img src="https://img.shields.io/badge/node.js-v16.16.0-green">
  <img src="https://img.shields.io/badge/react-v18.2.0-blue">
  <img src="https://img.shields.io/badge/react--router-v5.2.1-yellow">
  <img src="https://img.shields.io/badge/express-v4.18.2-lightgrey">
  <img src="https://img.shields.io/badge/mongoose-v6.7.2-orange">
</p>
  

## Frontend:
### URL:
https://staskudinow.mesto.nomoredomains.club

### Запуск проекта:
* Установить __npm__ `npm install -g npm`;
* Запустить проект `npm start`;

### Функциональность проекта:
* Одностраничное приложение, написанное на __React__. Вместо нативного __HTML__ используется синтаксис __JSX__;
* Реализована __регистрация__ и __авторизация__ пользователя, сохранение пользователя в __базе данных__;
* Для авторизации пользователя используется __токен__, хранящийся в `localStorage` браузера;
* Реализовано __добавление/удаление__ карточек, __постановка/снятие__ лайка. Сохраненные карточки со всеми данными хранятся в базе данных;
* Возможность изменять __данные профиля__ пользователя, с последующим сохранением данных на сервере;
* Связь с __API__ при помощи метода `fetch`;
* Код разбит на __модули__. Каждый модуль отвечает за свой функционал;
* Стили __CSS__ разбиты на блоки. Файловая структура по методологии __БЭМ__;

## Backend:
### URL:
https://api.staskudinow.mesto.nomoredomains.club

### Запуск проекта:
* Для запуска проекта в режиме __development__ `npm run dev`;
* Для запуска проекта в режиме __production__ `npm start`;

### Функциональность проекта:
* Код сервера написан с помощью фреймворка __express__;
* Данные хранятся в __MongoDB__. Перед отправкой на сервер, все данные валидируются посредством моделей данных. Используется метод `mongoose.Schema`;
* Реализованы __контроллеры__ для обработки всех запросов;
* Маршруты обрабатываются при помощи __Express Router__. Все данные проходят валидацию __celebrate Joi__, перед попаданием в контроллер;
* Реализовано логирование __запросов__ и __ошибок__ в отдельные файлы в корне проекта;
* Установлен __линтер__ для корректности кода;

## Технологии в проекте:
<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-black?style=for-the-badge&logo=JavaScript&logoColor=yellow"/>
  <img src="https://img.shields.io/badge/React-black?style=for-the-badge&logo=React&logoColor=blue"/>
  <img src="https://img.shields.io/badge/Node.js-black?style=for-the-badge&logo=Node.js&logoColor=green"/>
  <img src="https://img.shields.io/badge/Express-black?style=for-the-badge&logo=Express&logoColor=Aqua"/>
  <img src="https://img.shields.io/badge/MongoDB-black?style=for-the-badge&logo=MongoDB&logoColor=SeaGreen"/>
</p>

__IP:__ 158.160.47.31

__Developers:__ [Stas Kudinov](https://github.com/StasKudinow)
