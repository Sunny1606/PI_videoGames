const { Router } = require("express");
// Importar todos los routers;
const { Videogame, Genders } = require("../db");

const router = Router();



router.get("/videogames");    //JUEGOS
router.get("/videogames/:idVideogame");   //ID
router.get("/genders"); //GENEROS
router.post("/videogames");   //CREA JUEGOS




module.exports = router;
