import axios from "axios";

export const getGenres = (videogames) => {
  const endpoint = "http://localhost:3005/genres";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, videogames);

      return dispatch({
        type: "GET_ALL_GENRES",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPlatforms = (videogames) => {
  const endpoint = "http://localhost:3005/platform";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, videogames);

      return dispatch({
        type: "GET_ALL_PLATFORMS",
        payload: data,
      });
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

// export const orderGenres = (order) => {
//   return {
//     type: "ORDER_GENRES",
//     payload: order,
//   };
// };

export const filterPlatforms = (platform) => {
  return {
    type: "FILTER_PLATFORMS",
    payload: platform,
  };
};

// export const orderPlatforms = (order) => {
//   return {
//     type: "ORDER_PLATFORMS",
//     payload: order,
//   };
// };
