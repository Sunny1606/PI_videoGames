const router = require("express").Router();

const getGames = require ("../handlers/GetControllers/getGames");
const {
  getVideogamesById,
  getGameByName,
  getGenres,
} = require("../handlers/GetControllers/getVideogames");
const newVideogames = require("../handlers/PostController/postVideogames");


router.get("/games" , getGames);    //todos los juegos de la api y la base de datos

router.get("/genres", getGenres);

router.get("/videogamename", getGameByName);     

router.get("/detail/:id", getVideogamesById); // BY ID

router.post("/createdgames", newVideogames); //CREA JUEGOS

module.exports = router;

