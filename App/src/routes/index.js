//importa el modulo de ruta de express y ccrea una instancia de Router 
const router = require("express").Router();


//importta los controllers de los juegos y los generos 
const getGames = require ("../handlers/GetControllers/getGames");
const {
  getVideogamesById,
  getGameByName,
  getGenres,
} = require("../handlers/GetControllers/getVideogames");
const newVideogames = require("../handlers/PostController/postVideogames");

//define las rutas para los endpoints relacionados 
router.get("/games" , getGames);     // all games

router.get("/genres", getGenres);   // all genres

router.get("/name/:name", getGameByName);     // BY name

router.get("/detail/:id", getVideogamesById); // BY ID

router.post("/createdgames", newVideogames); //CREA JUEGOS

module.exports = router;

