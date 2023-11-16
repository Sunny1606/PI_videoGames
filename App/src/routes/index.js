const router = require("express").Router();

const getGames = require ("../handlers/GetControllers/getGames");
const {
  getVideogamesById,
  getGameByName,
  getGenres,
} = require("../handlers/GetControllers/getVideogames");
const postVideogames = require("../handlers/PostController/postVideogames");


router.get("/games" , getGames);    //todos los juegos de la api y la base de datos

router.get("/genres", getGenres);

router.get("/:name", getGameByName);     

router.get("/detail/:id", getVideogamesById); // BY ID

router.post("/createdgames", postVideogames); //CREA JUEGOS

module.exports = router;
