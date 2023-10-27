const router = require("express").Router();
const games = require("../handlers/games");
const {getAllVideogames, getVideogamesById, getGameByName , getGenres}  = require("../handlers/getVideogames");  
const postVideogames = require("../handlers/postVideogames");
const validateAPIKey = require("../utils/validateAPIKey");


router.get("/videogames" , validateAPIKey, games); //API videogames

router.get("/allvideogames" , getAllVideogames);    //allJUEGOS data base

router.get("/game/:id" , getVideogamesById);   // BY ID

router.get("/genres" , getGenres); // BY GENEROS

router.get("/games" , getGameByName); // BY NOMBRE

router.post("/videogames" , postVideogames);   //CREA JUEGOS


module.exports = router;


