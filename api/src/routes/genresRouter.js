const { Router } = require('express');
const getGenresVideogames = require('../handlers/genresHandlers');

const genresRouter = Router();

genresRouter.get('/', getGenresVideogames);

module.exports = genresRouter;