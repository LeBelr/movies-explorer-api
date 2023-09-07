# Бэкенд проекта Movies
Репозиторий бэкенда проеткта Movies - приложения, в котором можно искать фильмы и добавлять их в личный кабинет.

## Функционал
Роуты для пользователей:
- GET /users/me — возвращает информацию о пользователе
- PATCH /users/me — обновляет информацию о пользователе

Роуты для фильмов:
- GET /movies — возвращает все фильмы из базы
- POST /movies — создаёт фильм с переданными в теле запроса country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU и nameEN
- DELETE /movies/:movieId — удаляет фильм по _id

## Технологии
- JavaScript
- NodeJS
- Express
- MongoDB

## Установка и запуск проекта:
1. git clone https://github.com/LeBelr/movies-explorer-api.git - клонирование репозитория
2. npm i - установка зависимостей
3. npm run start - запуск сервера

## Ссылка на проект
https://api.mvs.nomoredomains.rocks
