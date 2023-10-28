const router = require("express").Router();
const {
  getVideogamesById,
  getGameByName,
  getGenres,
} = require("../handlers/getVideogames");
const postVideogames = require("../handlers/postVideogames");
const axios = require("axios");



//obtiene un array de todos los videogames
router.get("/games", async (req, res) => {
  try {
    const apiKey = process.env.RAWG_API_KEY; 
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${apiKey}`
    );
    const videogames = response.data.results;
    res.json(videogames);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los videojuegos.");
  }
});



router.get("/games/:id", getVideogamesById); // BY ID

router.get("/genres", getGenres); // BY GENEROS

router.get("/games", getGameByName); // BY NOMBRE

router.post("/createdgames", postVideogames); //CREA JUEGOS

module.exports = router;
