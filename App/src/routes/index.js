const router = require("express").Router();
require('dotenv').config();

const {
  getVideogamesById,
  getGameByName,
  getGenres,
} = require("../handlers/GetControllers/getVideogames");
const postVideogames = require("../handlers/PostController/postVideogames");

// obtiene un array de todos los videogames

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

router.get("/genres", getGenres);

router.get("/name", getGameByName);

router.get("/:id", getVideogamesById); // BY ID

router.post("/createdgames", postVideogames); //CREA JUEGOS

module.exports = router;
