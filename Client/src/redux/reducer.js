const InitialState = {
  videogames: [],
  genres: [],
};

const rootReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case "GET_ALL_GAMES":
      return { ...state, videogames: payload };
    case "GET_ALL_GENRES":
      return { ...state, genres: payload };
  }
};

export default rootReducer;
