const router = require("../routes");
const { Videogame, Genres } = require("../db");
const { Router } = require("express");

const postVideogames = async (req, res) => {
  try {
    const { name, description, platform, image, date, rating} = req.body;
    if (!name || !description || !platform || !image || !date || !rating) res.status(401).json("Faltan datos");
    else {
      const newVideogame = await Videogame.create({
        where: {
          name: name,
          description: description,
          platform: platform,
          image: image,
          date: date,
          rating: rating,
        }
      });
      if (genres && genres.length > 0) {
        const genresExist = await Genres.findAll({ where: { name: genres } });
        await newVideogame.setGenres(genresExist);
      }
      res.json(newVideogame);
    }

  } catch (error) {
    res.status(500).json({ error: "Hubo un error al crear el videojuego." });
  }
};

module.exports = postVideogames;
