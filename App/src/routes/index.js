const router = require("express").Router();
const games = require("../handlers/games");
const {getAllVideogames, getVideogamesById, getGameByName , getGenres}  = require("../handlers/getVideogames");  
const postVideogames = require("../handlers/postVideogames");
const validateAPIKey = require("../utils/validateAPIKey");


router.get("/videogames" , validateAPIKey, games);
router.get("/allvideogames" , getAllVideogames);    //JUEGOS
router.get("/game/:id" , getVideogamesById);   //ID
router.get("/genres" , getGenres); //GENEROS
router.get("/games" , getGameByName);
router.post("/videogames" , postVideogames);   //CREA JUEGOS


module.exports = router;


