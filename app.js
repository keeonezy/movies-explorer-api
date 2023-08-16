// Express фреймворка
const express = require('express');
require('dotenv').config();
// Для работы с БД
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const errorCheck = require('./middlewares/checkError');
const { PORT, urlBD } = require('./config');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 минут
  max: 100, // 100 запросов разрешается на IP
});

// Создаем сервер
const app = express();
app.use(cors); // проверяем cors запросы
console.log(process.env.NODE_ENV); // если не найдено, то выдаст undefined

// Подключаемся к БД
mongoose.connect(urlBD);
mongoose.connection.on('connected', () => console.log('Связь с БД установлена'));
mongoose.connection.on('error', () => console.log('Бд сломалась - '));

app.use(express.json());
app.use(helmet());
app.use(limiter);

app.use(requestLogger); // подключаем логгер запросов

app.use(router);

app.use(errorLogger); // логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorCheck);

// Беру порт и передаю колбэк, он вызовется в момент его старта
app.listen(PORT, () => {
  console.log(`Сервер запущен на порте: ${PORT}`);
});
