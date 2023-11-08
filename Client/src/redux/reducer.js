import {
  GET_GAMES,
  GET_GENRES,
  POST_GAMES,
  ORDER_BY_NAME,
  FILTER_BY_GENRE,
  FILTER_BY_RATING,
  SEARCH_BY_NAME,
  SEARCH_BY_ID,
  FILTER_CREATED,
} from "./actions";

const InitialState = {
  videogames: [],
  genres: [],
  source: [],
  detail: [],
};

const rootReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    //case de games
    case GET_GAMES:
      return {
        ...state,
        videogames: payload,
        fullGames: payload,
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
      const todosVideogames = state.fullGames;
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
      const allGames = state.fullGames;

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

    case POST_GAMES:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default rootReducer;

// const InitialState = {
//   videogames: [],
//   genres: [],
//   source: [],
// };

// const rootReducer = (state = InitialState, { type, payload }) => {
//   switch (type) {
//     //case de games
//     case "GET_ALL_GAMES":
//       return { ...state, videogames: payload };
//     case "GET_ALL_GENRES":
//       return { ...state, genres: payload };

//     case "FILTER_SOURCE":
//       // eslint-disable-next-line no-case-declarations
//       let filteredSource = state.videogames.filter((game) => {
//         if (payload === "ALL") {
//           return true;
//         }
//         return game.source === payload;
//       });
//       return {
//         ...state,
//         filteredSource,
//       };

//     case "FILTER_GENRES":
//       // eslint-disable-next-line no-case-declarations
//       let filteredGenres = state.genres.filter((genre) => {
//         return genre.name === payload; // Filtra por el nombre del género
//       });
//       return {
//         ...state,
//         filteredGenres, // Guarda los géneros filtrados en un nuevo estado
//       };

//       case "ORDER":
//       // eslint-disable-next-line no-case-declarations
//       let copy = state.videogames.sort((a, b) => {
//         return a > b ;
//       });
//       return {
//         ...state,
//         videogames: copy,
//       };

//       case "RANKING":
//         // eslint-disable-next-line no-case-declarations
//         let copy2 = state.videogames.sort((a, b) => {
//           return payload === "A" ? a.id - b.id : b.id - a.id;
//         });
//         return {
//           ...state,
//           videogames: copy2,
//         };

//       default:
//         return state;
//   }
// };

// export default rootReducer;
