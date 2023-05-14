require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Genres } = require('../db')

const getVideogamesGenres = async () => {

  const URL_BASE = `https://api.rawg.io/api/genres?key=${API_KEY}`;

  const apiGenres = (await axios.get(URL_BASE)).data
  const videogamesGenres = apiGenres.results.map((gen)=> gen.name);
  

  videogamesGenres.flat().forEach(async (element) => {
    await Genres.findOrCreate({where: { name: element }});
  });
  
  const allVideogamesGenres = await Genres.findAll();
  return allVideogamesGenres
}

module.exports = getVideogamesGenres;