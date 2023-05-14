const { Videogame, Genres } = require('../db');
const axios = require('axios');

// Para traer .env
require('dotenv').config();
const { API_KEY } = process.env;

const URL_BASE = `https://api.rawg.io/api/games?key=${API_KEY}`;

// Filtra todos los datos que no queremos de un array de objetos
const cleanVideogame = (arr) => 
  arr.map((elem) => {
    return{
      id: elem.id,
      name: elem.name,
      description: elem.description,
      platforms: elem.platforms,
      background_image: elem.background_image,
      released: elem.released,
      rating: elem.rating,
      createdVideogame: elem.createdVideogame || false,
      genres: elem.genres.map((e) => e.name)
    }
  });

// Obtiene un videojuego a traves de params
const getVideogameById = async ( idVideogame, source ) => {
  const buildUrl = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
  
  const videogame =
  source === 'api'
  ? (await axios.get(buildUrl)).data
  : await Videogame.findByPk(idVideogame,
    {
      include: {
        model: Genres,
        attributes: ['title']
      }
    });
  videogameFiltered = {
    id: videogame.id,
    name: videogame.name,
    description: videogame.description,
    platforms: videogame.platforms.map(platform => platform.platform.name),
    background_image: videogame.background_image,
    genres: videogame.genres.map((g)=> g.name),
    released: videogame.released,
    rating: videogame.rating
  };
  return videogameFiltered;
}

// obtiene todos los videojuegos, de DB y API
const getAllVideogames = async () => {
  // buscar en db
  const dbVideogames = await Videogame.findAll();
  // buscar en api
  const apiVideogamesRaw = (await axios.get(`${URL_BASE}`)).data.results;
  
  const apiVideogames = cleanVideogame(apiVideogamesRaw);

  // Unificar
  return [...dbVideogames, ...apiVideogames];
};

module.exports = { getAllVideogames,  getVideogameById};