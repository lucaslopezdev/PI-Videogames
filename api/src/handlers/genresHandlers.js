const getVideogamesGenres = require('../controllers/genresController')

const getGenresVideogames = async (req, res) => {
  try {
    const genres = await getVideogamesGenres();
    res.status(200).json(genres)
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = getGenresVideogames;