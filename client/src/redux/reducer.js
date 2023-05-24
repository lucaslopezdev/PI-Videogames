import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_GENRES,
  SEARCH_BY_NAME,
  GET_BY_DETAIL,
  RESET_DETAIL,
  GENRE_FILTER,
  ORIGIN_FILTER,
  FILTER_BY_ORDER,
  FILTER_BY_RATING,
  CREATE_VIDEOGAME,
} from "./actions";

const initialState = {
  videogames: [],
  genres: [],
  detailGames: {},
  copyGames: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        copyGames: action.payload,
      };

    case GET_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case CREATE_VIDEOGAME:
      return {
        ...state,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };

    case GET_BY_DETAIL:
      return {
        ...state,
        detailGames: action.payload,
      };

    case RESET_DETAIL:
      return {
        ...state,
        detailGames: action.payload,
      };

    case GENRE_FILTER:
      const filteredGames = state.copyGames.filter((game) =>
        game.genres?.includes(action.payload)
      );

      return {
        ...state,
        videogames: filteredGames,
      };

    case ORIGIN_FILTER:
      if ("api" === action.payload) {
        const filterApi = state.videogames.filter(
          (vg) => vg.createdVideoGame !== true
        );
        return { ...state, videogames: filterApi };
      } else if ("created" === action.payload) {
        const filterDb = state.videogames.filter(
          (vg) => vg.createdVideoGame === true
        );
        return { ...state, videogames: filterDb };
      } else {
        return { ...state, videogames: state.copyGames };
      }

    case FILTER_BY_ORDER:
      let copyVideogames = [...state.videogames];
      let orderedGames =
        action.payload === "a-z"
          ? copyVideogames.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : copyVideogames.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        videogames: orderedGames,
      };

    case FILTER_BY_RATING:
      let copyVideoRating = [...state.videogames];
      let ratingGames =
        action.payload === "1-9"
          ? copyVideoRating.sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : copyVideoRating.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: ratingGames,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
