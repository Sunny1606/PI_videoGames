import axios from "axios";

// hacer getGames
export const getGames = () => {
  return async function (dispatch) {
    try {
      const {data} = await axios.get("http://localhost:3005/games");
      dispatch({
        type: "GET_ALL_GAMES",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGenres = () => {
  const endpoint = "http://localhost:3005/genres";
  return async function (dispatch) {
    try {
      const { data } = await axios.get(endpoint);

      if (Array.isArray(data)) {
        const genres = data.map((genre) => ({
          id: genre.id,
          name: genre.name,
        }));
        dispatch({
          type: "GET_ALL_GENRES",
          payload: genres,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPlatforms = () => {
  const endpoint = "http://localhost:3005/platforms";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      if (Array.isArray(data)) {
        const platforms = data.map((platform) => ({
          name: platform.name,
        }));

        dispatch({
          type: "GET_ALL_PLATFORMS",
          payload: platforms,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterSource = (source) => {
  return {
    type: "FILTER_SOURCE",
    payload: source,
  };
};

export const filterGenres = (genre) => {
  return {
    type: "FILTER_GENRES",
    payload: genre,
  };
};

export const filterPlatforms = (platform) => {
  return {
    type: "FILTER_PLATFORMS",
    payload: platform,
  };
};
export const orderAZ = (order) => {
  return {
    type: "ORDER",
    payload: order,
  };
};
