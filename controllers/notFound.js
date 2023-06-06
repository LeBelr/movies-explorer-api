const { notFoundError } = require('../errors/errors');

function notFound(req, res) {
  res.status(notFoundError).send({ message: 'Страница не найдена' });
}

module.exports = notFound;
