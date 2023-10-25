const router = require("../routes");
const { Videogame, Genres } = require("../models");
const { Router } = require("express");
//crear un juego nuevo en la base de datos , recibe por body

router.post("/videogames", async (req, res) => {
  try {
    const { name, genres } = req.body;

    const newVideogame = await Videogame.Create({ name });
    if (genres && genres.length > 0) {

      const genresExist = await Genres.findAll({ where: { name: genres }});
      await newVideogame.setGenres(genresExist);

    }
    res.json(newVideogame);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al crear el videojuego.' });
  }
});
