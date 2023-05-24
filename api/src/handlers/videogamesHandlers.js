const {
  getAllVideogames,
  getVideogameById,
  newVideogame,
  videogameToDelete,
} = require("../controllers/videogamesController");


const getVideogamesQuery = async (req, res) => {
  try {
    const { name } = req.query;
    const allVideogames = await getAllVideogames();

    if (name) {
      let filteredVideoGames = allVideogames
        .filter((vg) => vg.name.toLowerCase().includes(name.toLowerCase()))
        .slice(0, 15);
      return res.status(200).json(filteredVideoGames);
    }
    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVideogameParams = async (req, res) => {
  const { idVideogame } = req.params;
  const source = isNaN(idVideogame) ? "db" : "api";

  try {
    const videogame = await getVideogameById(idVideogame, source);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
      res.status(404).send("Aca falta info mi rey");
    } else {
      const videogameCreated = await newVideogame(
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        genres
      );
      return res.status(200).json(videogameCreated);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const deleteVideogame = async (req, res) => {
  try {
    const { idVideogame } = req.params;
    const videoGame = await videogameToDelete(idVideogame);

    res.status(200).json(videoGame)
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = { getVideogamesQuery, getVideogameParams, postVideogames, deleteVideogame };
