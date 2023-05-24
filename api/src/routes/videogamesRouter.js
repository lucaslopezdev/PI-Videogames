const { Router } = require('express');
const { getVideogamesQuery, getVideogameParams, postVideogames, deleteVideogame } = require('../handlers/videogamesHandlers')


const videogamesRouter = Router();

videogamesRouter.get('/', getVideogamesQuery);

videogamesRouter.get('/:idVideogame', getVideogameParams);

videogamesRouter.post('/', postVideogames)

videogamesRouter.delete('/:idVideogame', deleteVideogame)


module.exports = videogamesRouter;