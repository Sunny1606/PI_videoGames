const InitialState = {
  videogames: [],
  genres: [],
  platforms: [],
  source: [],
};

const rootReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    //case de games
    case "GET_ALL_GAMES":
      return { ...state, videogames: payload };
    case "GET_ALL_GENRES":
      return { ...state, genres: payload };
    case "GET_ALL_PLATFORMS":
      return { ...state, platforms: payload };

    case "FILTER_SOURCE":
      // eslint-disable-next-line no-case-declarations
      let filteredSource = state.videogames.filter((game) => {
        if (payload === "ALL") {
          return true;
        }
        return game.source === payload;
      });
      return {
        ...state,
        filteredSource,
      };

    case "FILTER_GENRES":
      // eslint-disable-next-line no-case-declarations
      let filteredGenres = state.genres.filter((genre) => {
        return genre.name === payload; // Filtra por el nombre del género
      });
      return {
        ...state,
        filteredGenres, // Guarda los géneros filtrados en un nuevo estado
      };

    case "FILTER_PLATFORMS":
      // eslint-disable-next-line no-case-declarations
      let filteredPlatforms = state.platforms.filter((platform) => {
        return platform.result.name === payload; // Filtra por el nombre de la plataforma
      });
      return {
        ...state,
        filteredPlatforms, // Guarda las plataformas filtradas en un nuevo estado
      };

      case 'ORDENAR_POR_NOMBRE':
        return {
          ...state,
          videogames: state.videogames.sort((a, b) => {
            if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
              return -1;
            }
            if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
              return 1;
            }
            return 0;
          }),
        };
      default:
        return state;
    }
  //   case "ORDER":
  //     // eslint-disable-next-line no-case-declarations
  //     let copy4 = state.videogames.sort((a, b) => {
  //       if (payload === "A") {
  //         return (a.name.toLowerCase() > b.name.toLowerCase()) // Ordenar de A-Z
  //       } else {
  //         return (b.name.toLowerCase() < a.name.toLowerCase())// Ordenar de Z-A
  //       }
  //     })
  //     return {
  //       ...state,
  //       videogames: copy4,
  //     };

  //   default:
  //     return state;
  // }
};

export default rootReducer;
