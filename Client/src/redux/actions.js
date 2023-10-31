import axios from "axios";

export const genres = (videogames) => {
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


export const platforms = (videogames) => {
  const endpoint = "http://localhost:3005/platform";
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








// export const filterGames = (gender) => {
//     return {
//       type: "FILTER",
//       payload: gender,
//     };
//   };
//   export const orderGames = (orden) => {
//     return {
//       type: "ORDER",
//       payload: orden,
//     };
//   };
