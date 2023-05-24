const { Videogame, Genres } = require("../db");
const axios = require("axios");

// Para traer .env
require("dotenv").config();
const { API_KEY } = process.env;

const URL_BASE = `https://api.rawg.io/api/games?key=${API_KEY}`;

// Obtiene un videojuego a traves de params
const getVideogameById = async (idVideogame, source) => {
  const buildUrl = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;

  const videogame =
    source === "api"
      ? (await axios.get(buildUrl)).data
      : await Videogame.findByPk(idVideogame);

  if (source !== "api") return videogame;

  videogameFiltered = {
    id: videogame.id,
    name: videogame.name,
    description: videogame.description,
    platforms: videogame.platforms.map((platform) => platform.platform.name),
    background_image: videogame.background_image,
    genres: videogame.genres.map((genre) => genre.name),
    released: videogame.released,
    rating: videogame.rating,
  };
  return videogameFiltered;
};

const getVideogamesApi = async () => {
  const games = [];

  let URL_BASE = `https://api.rawg.io/api/games?key=${API_KEY}`;

  for(let i = 0 ; i < 5 ; i++) {
    let page = await axios.get(URL_BASE);
    page.data?.results.forEach((element) => {
      games.push({
        id: element.id,
        name: element.name,
        description: element.description,
        platforms: element.platform?.map((platform) => platform.platform.name) || [],
        background_image: element.background_image,
        released: element.released,
        rating: element.rating,
        genres: element.genres?.map((genre) => genre.name) || [],
        createdVideoGame: false,
      });
    });
    URL_BASE = page.data.next;
  }
  return games;
};

// obtiene todos los videojuegos, de DB y API
const getAllVideogames = async () => {
  // buscar en db
  const dbVideogames = await Videogame.findAll();
  // buscar en api

  const apiVideogames = await getVideogamesApi();

  // Unificar
  return [...dbVideogames, ...apiVideogames];
};

// crea un nuevo videojuego
const newVideogame = async (
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genres
) => {
  const [newGame, created] = await Videogame.findOrCreate({
    where: { name: name },
    defaults: {
      name,
      description,
      platforms,
      background_image: background_image,
      released,
      rating,
    },
  });

  genres.forEach(async (element) => {
    const [dbGenre, created] = await Genres.findOrCreate({
      where: { name: element },
      defaults: { name: element },
    });
    await newGame.addGenres(dbGenre);
  });

  if (created) {
    return newGame;
  } else {
    throw Error("Videogame already exists");
  }
};

const videogameToDelete = async (idVideogame) => {
  const getVideogame = await Videogame.findByPk(idVideogame);

  if( getVideogame){
    getVideogame.destroy();
    return "Deleted Videogame";
  } else {
    throw Error("Videogame not found")
  }
};

module.exports = { getAllVideogames, getVideogameById, newVideogame, videogameToDelete };