import axios from "axios";

export const addGame = (videogames) => {
  const endpoint = "http://localhost:3005/games";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, videogames);

      return dispatch({
        type: "GET_ALL_GAMES",
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
