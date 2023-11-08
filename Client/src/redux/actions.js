import axios from "axios";


export const GET_GAMES = "GET_GAMES";   //muestra todos los games
export const GET_GENRES = "GET_GENRES";   // muestra todos los generos 
export const POST_GAMES = "POST_GAMES";    
export const SEARCH_BY_NAME = "SEARCH_BY_NAME"     
export const ORDER_BY_NAME = "ORDER_BY_NAME";   // alfabrticamente 
export const FILTER_BY_RATING = "FILTER_BY_RATING";     //filtro de rating 
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";  //filtro genero 
export const FILTER_CREATED = "FILTER_CREATED";   //base de datos filtro 
export const SEARCH_BY_ID = "SEARCH_BY_ID";    



export function getGames() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3005/games");
    return dispatch({
      type: GET_GAMES,
      payload: response.data,
    });
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

export function getDetail(id) {

  if (id) {
    return async function (dispatch) {
      try {
     
        const response = await axios.get(`http://localhost:3005/games/${id}`);
        return dispatch({
          type: SEARCH_BY_ID,
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
  return {
    type: SEARCH_BY_ID,
    payload: [],
  };
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3005/name=${name}`);   
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}


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

export function postGame(payload) {
  // eslint-disable-next-line no-unused-vars
  return async function (dispatch) {
    const response = await axios.post("/videogame", payload);
    return response;
  };
}


// hacer getGames
// export const getGames = () => {
//   return async function (dispatch) {
//     try {
//       const {data} = await axios.get("http://localhost:3005/games");
//       dispatch({
//         type: "GET_ALL_GAMES",
//         payload: data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

// export const getGenres = () => {
//   const endpoint = "http://localhost:3005/genres";
//   return async function (dispatch) {
//     try {
//       const {data}  = await axios.get(endpoint);
     

//       if (Array.isArray(data)) {
//         const genres = data.map((genre) => ({
//           id: genre.id,
//           name: genre.name,
//         }));
//         dispatch({
//           type: "GET_ALL_GENRES",
//           payload: genres,
//         });
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };



// export const filterSource = (source) => {
//   return {
//     type: "FILTER_SOURCE",
//     payload: source,
//   };
// };

// export const filterGenres = (genre) => {
//   return {
//     type: "FILTER_GENRES",
//     payload: genre,
//   };
// };


// export const orderAZ = (order) => {
//   return {
//     type: "ORDER",
//     payload: order,
//   };
// };
// export const orderByRanking = (orden) => {
//   return {
//     type: "RANKING",
//     payload: orden,
//   };
// };