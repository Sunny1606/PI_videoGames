import {
  GET_GAMES,
  GET_GENRES,
  POST_GAMES,
  ORDER_BY_NAME,
  FILTER_BY_GENRE,
  FILTER_BY_RATING,
  SEARCH_BY_NAME,
  FILTER_CREATED,
} from "./actions";

const InitialState = {
  searchVideogame: [],
  videogames: [],
  searchvideogamesCopy: [],
  genres: [],
};

const rootReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    //case de games
    case GET_GAMES:
      
      return {
        ...state,
        videogames: payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        videogames: payload,
        searchvideogamesCopy: payload
      };

    case FILTER_BY_GENRE:
      // eslint-disable-next-line no-case-declarations
      const { videogames } = state;
      // eslint-disable-next-line no-case-declarations
      const filteredGen = videogames.filter((game) =>
        game.genres.includes(payload)
      );
      return {
        ...state,
        videogames: filteredGen,
      };

    case FILTER_BY_RATING:
      // eslint-disable-next-line no-case-declarations
      let sortedRating =
        payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
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
        videogames: sortedRating,
      };

    case ORDER_BY_NAME:
      // eslint-disable-next-line no-case-declarations
      let sortName =
        payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortName,
      };

    case FILTER_CREATED:
      // eslint-disable-next-line no-case-declarations
      let filteredGames;

      if (payload === "api") {
        filteredGames = state.videogames;
      } else {
        const isCreated = payload === "created";

        filteredGames = state.videogames.filter((el) => {
          // Lógica de filtrado para juegos creados o de la API
          return isCreated ? el.createdInDb : !el.createdInDb;
        });
      }

      return {
        ...state,
        videogames: filteredGames,
      };

    case POST_GAMES:
      return {
        ...state,
        videogames: payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
