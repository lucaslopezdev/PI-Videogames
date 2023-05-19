const { getAllVideogames, getVideogameById } = require('../controllers/videogamesController');

const { Videogame, Genres } = require('../db');

const getVideogamesQuery = async (req, res) => {
  try {
      const { name } = req.query;
      const allVideogames = await getAllVideogames();

      if(name){
        let filteredVideoGames = allVideogames
          .filter((vg) => vg.name.toLowerCase().includes(name.toLowerCase()))
          .slice(0, 15);
        return res.status(200).json(filteredVideoGames);
      }
      res.status(200).json(allVideogames);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
}

const getVideogameParams = async (req, res) => {
  const { idVideogame } = req.params;
  const source = isNaN(idVideogame) ? 'db' : 'api';

  try {
    const videogame = await getVideogameById(idVideogame, source);
    res.status(200).json(videogame)
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

const postVideogames = async (req, res) => {
  try {
    const {
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres,
    } = req.body;

    if (
      !name ||
      !description ||
      !platforms ||
      !background_image ||
      !released ||
      !rating
    ) {
      res.status(404).send('Aca falta info pa');
    } else {
      const [newGame, created]  = await Videogame.findOrCreate({
        where: { name: name },
        defaults: {
          name,
          description,
          platforms,
          background_image: background_image,
          released,
          rating
        },
      });

      console.log(genres)
      
      genres.forEach(async (element) => {
        const [dbGenre, created] = await Genres.findOrCreate({
          where: {name: element},
          defaults: {name: element},
        });
        await newGame.addGenres(dbGenre);
      });

      if(created){
        res.status(200).json(newGame);
      }else{
        res.status(404).send("Videogame already exists")
      }

      
    }
  } catch (error) {
    res.status(404).send({error: error.message});
  }
};

module.exports = { getVideogamesQuery, getVideogameParams, postVideogames };