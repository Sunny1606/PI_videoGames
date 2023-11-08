const router = require("express").Router();

const {
  getVideogamesById,
  getGameByName,
  getGenres,
} = require("../handlers/GetControllers/getVideogames");
const postVideogames = require("../handlers/PostController/postVideogames");
const axios = require("axios");

//obtiene un array de todos los videogames
const URL = "https://api.rawg.io/api/";
const RESULTS_PER_PAGE = 50;
const MAX_RESULTS = 100;

router.get("/games", async (req, res) => {
  try {
    const apiKey = process.env.RAWG_API_KEY;
    let currentPage = 1;
    let totalResults = 0;
    let allGames = [];

    while (totalResults < MAX_RESULTS) {
      const apiResponse = await axios.get(
        `${URL}games?key=${apiKey}&page=${currentPage}&page_size=${RESULTS_PER_PAGE}`
      );

      const games = apiResponse.data.results;
      allGames = [...allGames, ...games];
      totalResults += games.length;
      currentPage += 1;
    }

    res.json(allGames);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los videojuegos.");
  }
});

router.get("/games/:id", getVideogamesById); // BY ID

router.get("/genres", getGenres); // BY GENEROS

router.get("/:name", getGameByName); //BY NAMES

router.post("/createdgames", postVideogames); //CREA JUEGOS

module.exports = router;
