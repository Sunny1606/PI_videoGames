import {
  GET_GAMES,
  GET_GENRES,
  ORDER_BY_NAME,
  FILTER_BY_GENRE,
  FILTER_BY_RATING,
  SEARCH_BY_NAME,
  SEARCH_BY_ID,
  FILTER_CREATED,
  //VERIFICAR POST GAMES   
} from "./actions";

const InitialState = {
  fullgames: [],
  videogames: [],
  genres: [],
  detail: [],
};

const rootReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    //case de games
    case GET_GAMES:
      return {
        ...state,
        videogames: payload,
        fullgames: payload,
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
      };
    case FILTER_BY_GENRE:
      // eslint-disable-next-line no-case-declarations
      const todosVideogames = state.fullgames;
      // eslint-disable-next-line no-case-declarations
      const filteredGen = todosVideogames.filter((e) =>
        e.genres.includes(payload)
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
      const allGames = state.fullgames;

      // eslint-disable-next-line no-case-declarations
      const createdFilter =
        payload === "created"
          ? allGames.filter((el) => el.createdInDb)
          : allGames.filter((el) => !el.createdInDb);
      return {
        ...state,
        videogames: payload === "All" ? allGames : createdFilter,
      };

    case SEARCH_BY_ID:
      return {
        ...state,
        detail: payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
