const { incorrectDataError, regError } = require('../errors/errors');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.name === 'ValidationError') {
    res.status(incorrectDataError).send({ message: 'Переданы некорректные данные' });
    return;
  }

  if (err.name === 'CastError') {
    res.status(incorrectDataError).send({ message: 'Передан некорректный id' });
    return;
  }

  if (err.code === 11000) {
    res.status(regError).send({ message: 'Пользователь с данной почтой существует' });
    return;
  }

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
};
