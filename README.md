### Димломная работа. Backend Api

## Информация о сервере
Репозиторий: https://github.com/keeonezy/movies-explorer-api  
Домен: api.film.nomoreparties.co  
IP: 158.160.18.246

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки

## Запуск проекта

`npm run start` — запускает сервер
`npm run dev` — запускает сервер с hot-reload

## Для единой структуры кода

`npx eslint . --fix` — приводит в порядок структуру проект

## API проекта
Создаёт пользователя с переданными в теле email, password и name: POST /signup  
Проверяет переданные в теле почту и пароль и возвращает JWT: POST /signin  
Возвращает информацию о пользователе (email и имя): GET /users/me  
Обновляет информацию о пользователе (email и имя): PATCH /users/me  
Создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId: POST /movies  
Возвращает все сохранённые текущим пользователем фильмы: GET /movies  
Удаляет сохранённый фильм по id: DELETE /movies/moviesID
