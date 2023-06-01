const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');

function getSavedMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .then((savedMovies) => {
      res.send(savedMovies);
    })
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Передан несуществующий id фильма');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      }
      return Movie.deleteOne(movie)
        .then(() => {
          res.send({ message: `Фильм ${movie._id} удален` });
        });
    })
    .catch(next);
}

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
