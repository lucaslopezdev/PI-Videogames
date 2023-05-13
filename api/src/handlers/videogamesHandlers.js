const { getAllVideogames, getVideogameById } = require('../controllers/videogamesController');

const getVideogamesQuery = async (req, res) => {
  try {
      const { name } = req.query;
      const allVideogames = await getAllVideogames();

      if(name){
        console.log(name)
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

module.exports = { getVideogamesQuery, getVideogameParams };