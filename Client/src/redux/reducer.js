const InitialState = {
  videogames: [],
  genres: [],
  platforms: [],
  source: [], 
};

const rootReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
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
        return platform.name === payload; // Filtra por el nombre de la plataforma
      });
      return {
        ...state,
        filteredPlatforms, // Guarda las plataformas filtradas en un nuevo estado
      };

    case "ORDER_GENRES":
      // eslint-disable-next-line no-case-declarations
      let orderedGenres = [...state.genres].sort((a, b) => {
        return payload === "A-Z"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
      return {
        ...state,
        orderedGenres, // Guarda los géneros ordenados en un nuevo estado
      };

    case "ORDER_PLATFORMS":
      // eslint-disable-next-line no-case-declarations
      let orderedPlatforms = [...state.platforms].sort((a, b) => {
        return payload === "A-Z"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
      return {
        ...state,
        orderedPlatforms, // Guarda las plataformas ordenadas en un nuevo estado
      };

    default:
      return state;
  }
};

export default rootReducer;
