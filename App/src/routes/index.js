const router = require("express").Router();
const { Router } = require("express");


<<<<<<< HEAD
const {
  getVideogamesById,
  getGameByName,
  getGenres,
} = require("../handlers/GetControllers/getVideogames");
const postVideogames = require("../handlers/PostController/postVideogames");
const axios = require("axios");
=======
>>>>>>> 0c22b022bb39acc5e7ea7f768c7e2de90619afb7

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
<<<<<<< HEAD
=======
    console.log(allGames);

>>>>>>> 0c22b022bb39acc5e7ea7f768c7e2de90619afb7
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los videojuegos.");
  }
});

<<<<<<< HEAD
router.get("/games/:id", getVideogamesById); // BY ID
=======

>>>>>>> 0c22b022bb39acc5e7ea7f768c7e2de90619afb7

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getGenres = require("./getGenres");
const getVideogames = require("./getVideogames");
const postVideogames = require("./postVideogames");

<<<<<<< HEAD
router.get("/:name", getGameByName); //BY NAMES

router.post("/createdgames", postVideogames); //CREA JUEGOS
=======
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getGenres); // GETS
router.get("/genres", getVideogames); // GET
router.post("/create", postVideogames); // POST
>>>>>>> 0c22b022bb39acc5e7ea7f768c7e2de90619afb7

module.exports = router;
