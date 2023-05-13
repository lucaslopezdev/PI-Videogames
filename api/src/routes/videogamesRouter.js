const { Router } = require('express');
const { getVideogamesQuery, getVideogameParams } = require('../handlers/videogamesHandlers')


const videogamesRouter = Router();

videogamesRouter.get('/', getVideogamesQuery);

videogamesRouter.get('/:idVideogame', getVideogameParams);

// videogamesRouter.post('/', postVideogame)
// videogamesRouter.delete('/:idVideogame', deleteVideogame)


module.exports = videogamesRouter;