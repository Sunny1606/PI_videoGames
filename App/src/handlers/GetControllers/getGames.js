require("dotenv").config();
// const { Videogame, Genres } = require("../../db");
const axios = require("axios");

//TODOS LOS JUEGOS 100

// const getGames = async (req, res) => {
//   try {
//     const API_KEY = process.env.RAWG_API_KEY;
//     const URL = "https://api.rawg.io/api/";

//     let currentPage = 1;
//     let totalResults = 0;
//     let allGames = [];

//     // Obtener juegos de la API externa
//     while (totalResults < MAX_RESULTS) {
//       const apiResponse = await axios.get(
//         `${URL}games?key=${API_KEY}&page=${currentPage}&page_size=${RESULTS_PER_PAGE}`
//       );

//       const gamesFromAPI = apiResponse.data.results.map((game) => ({
//         id: game.id,
//         name: game.name,
//         description: game.description,
//         image: game.background_image,
//         released: game.released,
//         platforms: game.platforms.map((platform) => platform.platform.name),
//         genres: game.genres.map((genre) => genre.name),
//         rating: game.rating,
//       }));

//       allGames = [...allGames, ...gamesFromAPI];
//       totalResults += gamesFromAPI.length;
//       currentPage += 1;
//     }

//     // Obtener juegos de la base de datos local
//     const gamesFromDB = await Videogame.findAll({
//       include: {
//         model: Genres,
//         attributes: ["name"],
//       },
//     });

//     // Mapear los juegos de la base de datos a un formato similar al de la API
//     const gamesFromDBFormatted = gamesFromDB.map((game) => ({
//       id: game.id,
//       name: game.name,
//       description: game.description,
//       image: game.image, // Asegúrate de ajustar según la estructura de tu modelo de juego
//       released: game.released,
//       platforms: game.platforms.map((platform) => platform.name),
//       genres: game.Genres.map((genre) => genre.name),
//       rating: game.rating,
//     }));

//     // Combinar juegos de la API y la base de datos
//     const mergedGames = [...allGames, ...gamesFromDBFormatted];

//     res.json(mergedGames);
//   } catch (error) {
//     console.error("Hubo un error al obtener los videojuegos:", error);
//     res.status(500).send("Hubo un error al obtener los videojuegos.");
//   }
// };


const URL = "https://api.rawg.io/api/";
const RESULTS_PER_PAGE = 50;
const MAX_RESULTS = 100;

const getGames = async (req, res) => {
  try {
    const API_KEY = process.env.RAWG_API_KEY;
    let currentPage = 1;
    let totalResults = 0;
    let allGames = [];

    while (totalResults < MAX_RESULTS) {
      const apiResponse = await axios.get(
        `${URL}games?key=${API_KEY}&page=${currentPage}&page_size=${RESULTS_PER_PAGE}`
      );

      const games = apiResponse.data.results.map((game) => ({
        id: game.id,
        name: game.name,
        description: game.description,
        image: game.background_image,
        released: game.released,
        platforms: game.platforms.map((platform) => platform.platform.name),
        genres: game.genres.map((genre) => genre.name),
        rating: game.rating,
      }));

      allGames = [...allGames, ...games];
      totalResults += games.length;
      currentPage += 1;
    }
    res.json(allGames); 

  } catch (error) {
    res.status(500).send("Hubo un error al obtener los videojuegos.");
  }
};

module.exports = getGames;
