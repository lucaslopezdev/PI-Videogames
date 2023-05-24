import axios from "axios";

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_BY_DETAIL = "GET_BY_DETAIL";
export const RESET_DETAIL = "RESET_DETAIL";
export const GENRE_FILTER = "GENRE_FILTER";
export const ORIGIN_FILTER = "ORIGIN_FILTER";
export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
export const FILTER_BY_RATING = "FILTER_BY_RATING";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const RESET_FILTERS = "RESET_FILTERS";
export const DELETE_GAME = "DELETE_GAME";

export const getAllVideogames = () => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/videogames";
    const response = await axios.get(URL);
    dispatch({ type: GET_ALL_VIDEOGAMES, payload: response.data });
  };
};

export const getAllGenres = () => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/genres";
    const response = await axios.get(URL);
    const genres = response.data.map((genre) => genre.name);
    dispatch({ type: GET_ALL_GENRES, payload: genres });
  };
};

export const searchByName = (name) => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/videogames";
    const response = await axios.get(`${URL}?name=${name}`);
    dispatch({ type: SEARCH_BY_NAME, payload: response.data });
  };
};

export const getByDetail = (id) => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/videogames";
    const response = await axios.get(`${URL}/${id}`);
    dispatch({ type: GET_BY_DETAIL, payload: response.data });
  };
};

export const backHome = () => {
  return { type: RESET_DETAIL, payload: {} };
};

export const createVideoGame = (form) => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/videogames";
    const postVideogame = await axios.post(URL, form);
    console.log(form);
    dispatch({ type: CREATE_VIDEOGAME, payload: postVideogame.data });
  };
};

export const removeGame = (detailId) => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/videogames";
    await axios.delete(`${URL}/${detailId}`);

    return dispatch({ type: DELETE_GAME, payload: detailId });
  };
};

// Filtros

export const filterByGenre = (payload) => {
  return { type: GENRE_FILTER, payload };
};

export const filterByOrigin = (payload) => {
  return { type: ORIGIN_FILTER, payload };
};

export const filterByOrder = (payload) => {
  return { type: FILTER_BY_ORDER, payload };
};

export const filterByRating = (payload) => {
  return { type: FILTER_BY_RATING, payload };
};

export const resetFilters = () => {
  return { type: RESET_FILTERS };
};
