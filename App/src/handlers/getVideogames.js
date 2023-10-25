const { Videogame, Genres } = require("../db");
const router = require("../routes");
const { Op } = require("sequelize");
const axios = require("axios");


//obtiene todos los juegos
const getAllVideogames =  async (req, res) => {
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
          [Op.iLike]: `%${name}%`, // metodo de sequelize que
        },
      },
      limit: 15,
    });
    if (results.lenght > 0) {
      res.json(results);
    } else {
      const apiKey = process.env.API_KEY;
    }

    const apyRes = await axios.get(
      `https://api.rawg.io/api/games?key=${apiKey}&search=${name}&page_size=15`
    );

    const apiResult = apyRes.data.results;
    res.json(apiResult);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al buscar los videojuegos." });
  }
};

//obtiene por generos
const getGenres = async (req, res) => {
  try {
    const dataGenres = await Genres.findAll();

    if (dataGenres.lenght > 0) {
      res.json(dataGenres);
    } else {
      const apiKey = process.env.API_KEY;
    }

    const apiResp = await axios.get(
      `https://api.rawg.io/api/genres?key=${apiKey}`
    );

    const apiGenres = apiResp.data.results;

    // Guarda los géneros en la base de datos
    await Genres.bulkCreate(apiGenres);

    res.json(apiGenres);
    
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al obtener los géneros" });
  }
};


module.exports = {
  getAllVideogames,
  getVideogamesById,
  getGameByName,
  getGenres
}
