const { Videogame, Genres } = require("../db");
const router = require("../routes");
const { Op } = require("sequelize");
const axios = require("axios");
const { API_KEY } = process.env;

//obtiene todos los juegos
const getAllVideogames = async (req, res) => {
  try {
    const videogames = await Videogame.findAll();
    res.json(videogames);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los videogames.");
  }
};

//obtiene juegos por id
const getVideogamesById = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Videogame.findByPk(id);
    if (game) res.json(game);
    else {
      res.status(404).send("Videogame no encontrado");
    }
  } catch (error) {
    res.status(500).send("Hubo un error al obtener el detalle del videogame.");
  }
};

//obtiene por query {name}
const getGameByName = async (req, res) => {
  try {
    const { name } = req.query;
    const results = await Videogame.findAll({
      where: {
        nombre: {
          [Op.iLike]: `%${name}%`, 
        },
      },
      limit: 15,
    });

    if (results.length > 0) {
      res.json(results);
    } else {
      const apiKey = process.env.API_KEY;
      const apiRes = await axios.get(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${name}&page_size=15`
      );

      const apiResult = apiRes.data.results;
      res.json(apiResult);
    }
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al buscar el videojuego con ese nombre" });
  }
};

//obtiene tanto de API como de la base de datos los generos
const getGenres = async (req, res) => {
  try {
    const dataGenres = await Genres.findAll();

    if (dataGenres.length > 0) {
      const mappedGenres = dataGenres.map((genre) => ({
        id: genre.id,
        name: genre.name,
      }));
      res.json(mappedGenres);
    } else {
      const apiResp = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );

      const apiGenres = apiResp.data.results;

      await Genres.bulkCreate(apiGenres);

      const mappedApiGenres = apiGenres.map((genre) => ({
        id: genre.id,
        name: genre.name,
      }));
      res.json(mappedApiGenres);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener los géneros" });
  }
};

module.exports = {
  getAllVideogames,
  getVideogamesById,
  getGameByName,
  getGenres,
};
