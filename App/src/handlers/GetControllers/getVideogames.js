const router = require("../../routes");
const { Op } = require("sequelize");
const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.RAWG_API_KEY;
const { Videogame, Genres } = require("../../db");

const getVideogamesById = async (req, res) => {
  const API_URL = "https://api.rawg.io/api/games";

  try {
    const { id } = req.params;
    let videogame = {};

    // Intenta buscar en la API
    try {
      const { name, description, platform, date, rating, image } = (
        await axios.get(API_URL + id)
      ).data;
      videogame = { id, name, description, platform, rating, date, image };
    } catch (apiError) {
      // Si no se encuentra en la API, busca en la base de datos local
      const game = await Videogame.findByPk(id);
      if (game) {
        videogame = game;
      } else {
        return res.status(404).send("Videojuego no encontrado");
      }
    }

    return res.json(videogame);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//obtiene por query {name}
const getGameByName = async (req, res) => {
  const API_URL = "https://api.rawg.io/api/games";
  try {
    const  _name  = req.params.name;
    
    let videogame = {};
    // Intenta buscar en la API
    
    const results = await axios.get(`https://api.rawg.io/api/games?search=${_name}&key=ae75eef952fb4f04915045df7043ee37`)
    console.log(results);
      
      
      videogame = obj ;

     if (!obj) {
      // Si no se encuentra en la API, busca en la base de datos local
      const game = await Videogame.findByPk(_name);
      if (game) {
        videogame = game;
      } else {
        return res.status(404).send("Videojuego no encontrado");
      }
    }
    return res.json(videogame);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//obtiene tanto de API como de la base de datos los generos
const getGenres = async (req, res) => {
  // const URL = "https://api.rawg.io/api/genres";

  try {
    const dataGenres = await Genres.findAll();

    if (dataGenres.length > 0) {
      const mappedGenres = dataGenres.map((genre) => ({
        id: genre.id,
        name: genre.name,
      }));
      res.json(mappedGenres);
    } else {
      // Si no se encontraron géneros en la base de datos, busca en la API
      // const apiResp = await axios.get(URL)
      const apiResp = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      const apiGenres = apiResp.data.results;

      // Almacena los géneros de la API en la base de datos
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
  getVideogamesById,
  getGameByName,
  getGenres,
};
