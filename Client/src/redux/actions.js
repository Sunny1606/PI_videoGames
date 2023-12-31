import axios from "axios";

export const GET_GAMES = "GET_GAMES"; //muestra todos los games
export const GET_GENRES = "GET_GENRES"; // muestra todos los generos
export const POST_GAMES = "POST_GAMES";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const ORDER_BY_NAME = "ORDER_BY_NAME"; // alfabrticamente
export const FILTER_BY_RATING = "FILTER_BY_RATING"; //filtro de rating
export const FILTER_BY_GENRE = "FILTER_BY_GENRE"; //filtro genero
export const FILTER_CREATED = "FILTER_CREATED"; //base de datos filtro

export function getGames() {
  return async function (dispatch) {
    try {
      let response = await axios.get("http://localhost:3005/games");
      
      return dispatch({
        type: GET_GAMES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3005/genres");
    return dispatch({
      type: GET_GENRES,
      payload: response.data,
    });
  };
}

export const searchVideogame = (data) => {
  return { type: SEARCH_BY_NAME, payload: data };
};


export const postGame = (payload) => {
  const { platforms } = payload;
  payload.platforms = platforms.join(",");
  return async (dispatch) => {
    const response = await axios.post(
      "http://localhost:3005/createdgames",
      payload
    );

    return dispatch({
      type: POST_GAMES,
      payload: response,
    });
  };
};


export function orderByRating(payload) {
  return {
    type: FILTER_BY_RATING,
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function filterByGenres(payload) {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}
