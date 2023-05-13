const { Router } = require('express');
const getGenres = require('../handlers/genresHandlers');


const genresRouter = Router();

genresRouter.get('/', getGenres);

module.exports = genresRouter;