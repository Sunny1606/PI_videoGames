const router = require("express").Router();
const { Router } = require("express");



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
    console.log(allGames);

  } catch (error) {
    res.status(500).send("Hubo un error al obtener los videojuegos.");
  }
});



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getGenres = require("./getGenres");
const getVideogames = require("./getVideogames");
const postVideogames = require("./postVideogames");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getGenres); // GETS
router.get("/genres", getVideogames); // GET
router.post("/create", postVideogames); // POST

module.exports = router;
