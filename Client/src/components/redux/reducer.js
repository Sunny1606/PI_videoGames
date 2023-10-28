const InitialState = {
  videogames: [],
};

const rootReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case "GET_ALL_GAMES":
      return { ...state, videogames: payload };
  }
};


export default rootReducer;
