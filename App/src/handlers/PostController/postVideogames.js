
const { Videogame, Genres } = require ("../../db");
const { Op } = require("sequelize");

const newVideogames = async (req, res) => {
  try {
    const { name, image, description, released, rating, platforms, genres } =
      req.body;

    const existingGame = await Videogame.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (existingGame) {
      throw new Error("El nombre del juego ya existe.");
    }


    const newVideogames = await Videogame.create({
      name,
      image,
      description,
      released,
      rating,
      platforms,
    });

    if (genres && genres.length > 0) {
      const generosCreados = await Promise.all(
        genres.map((genre) =>
          Genres.findOrCreate({
            where: { name: genre },
          })
        )
      );

      // Asocia los géneros al videojuego
      await newVideogames.addGenres(generosCreados.map((g) => g[0]));
    }

     res.status(201).json(newVideogames);

  } catch (error) {
    // return res.status(500).json(error.message);
    return res.status(500).json({ error: "Error interno del servidor", message: error.message });

  }
};



module.exports = newVideogames;

