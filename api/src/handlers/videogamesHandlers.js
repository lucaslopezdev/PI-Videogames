const { getAllVideogames, getVideogameById } = require('../controllers/videogamesController');

const { Videogame, Genres } = require('../db');

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

/* const getVideoGamesDb = async () => {
  try {
    const allVideogames = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    const videoGamesDb = allVideogames.map((e) => {
      return {
        id: e.id,
        name: e.name,
        rating: e.rating,
        background_image: e.background_image,
        genres: e.genres.map((e) => e.name),
        description: e.description,
        released: e.released,
        createdVideoGame: e.createdVideoGame,
        platforms: e.platforms,
      };
    });
    console.log(videoGamesDb);
    return videoGamesDb;
    console.log(videoGamesDb);
  } catch (error) {
    console.log(error.message);
    throw new Error("Error fetching video games from database");
  }
};

const getVideogameParams = async (req, res) => {
  try {
    const { idVideogame } = req.params;
    if (idVideogame.length > 7 && typeof idVideogame === "string") {
      const videoGame = await getVideoGamesDb();

      const filter = videoGame.filter((element) => element.id === idVideogame)
      res.status(200).json(filter[0]);

    } else {
      const getVideoGamesApi = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );
      const oneGame = {
        id: getVideoGamesApi.data.id,
        name: getVideoGamesApi.data.name,
        description: getVideoGamesApi.data.description,
        platforms: getVideoGamesApi.data.platforms.map(
          (platform) => platform.platform.name
        ),
        background_image: getVideoGamesApi.data.background_image,
        genres: getVideoGamesApi.data.genres.map((g)=>g.name),
        released: getVideoGamesApi.data.released,
        rating: getVideoGamesApi.data.rating,
      };
      res.status(200).json(oneGame);
    }
  } catch (error) {
    console.log(error.message);
  }
}; */
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