const router = require("express").Router();
const { Router } = require("express");



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genresRoutes = require("./getGenres");
const videogameRoutes = require("./getVideogames");
const videogamesRoutes = require("./postVideogames");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogamesRoutes); // GETS
router.use("/genres", genresRoutes); // GET
router.use("/videogame", videogameRoutes); // POST

module.exports = router;
