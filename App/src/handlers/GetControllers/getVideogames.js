const router = require("../../routes");
const { Op } = require("sequelize");
const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.RAWG_API_KEY;
const URL = "https://api.rawg.io/api/games";
const { Videogame, Genres } = require("../../db");

const getVideogamesById = async (req, res) => {
  const removeHTMLTags = (text) => {
    // Expresión regular para buscar y eliminar las etiquetas HTML
    const regex = /(<([^>]+)>)/gi;
    return text.replace(regex, "");
  };

  const { id } = req.params;

  try {
    // busco en la bdd si el id es uuid
    if (isNaN(id)) {
      const dbVideogame = await Videogame.findByPk(id, {
        include: {
          model: Genres,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      const dbFiltered = {
        id: dbVideogame.ID,
        Name: dbVideogame.Name,
        Platforms: dbVideogame.Platforms,
        Description: dbVideogame.Description,
        Released: dbVideogame.Released,
        Rating: dbVideogame.Rating,
        Genres: dbVideogame.Genres?.map((g) => g.Genre).join(", "),
        Image: dbVideogame.Image,
      };

      if (!dbVideogame) {
        res.status(404).send("Not found in Database");
      } else return res.status(200).json(dbFiltered);
    } // caso contrario busco en la api
    else {
      const { data } = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );

      const videogameByID = {
        id: data.id,
        Name: data.name,
        Platforms: data.platforms?.map((p) => p.platform.name).join(", "),
        Description: removeHTMLTags(data.description),
        Released: data.released,
        Rating: data.rating,
        Genres: data.genres?.map((g) => g.name).join(", "),
        Image: data.background_image,
      };

      res.status(200).json(videogameByID);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGameByName = async (req, res) => {
  const name = req.params.name;

  try {
    // Buscar en la base de datos
    const videoGamesFromDB = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: 100,
    });

    // Buscar en la API
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        page_size: 100,
        search: name,
      },
    });

    const videoGamesFromAPI = response.data.results;

    res.json({ results: [...videoGamesFromDB, ...videoGamesFromAPI] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//obtiene tanto de API como de la base de datos los generos
const getGenres = async (req, res) => {
  const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

  try {
    const response = await axios.get(URL);
    const apiGenres = response.data.results;

    // 2. Verificar si ya existen géneros en la DB
    const dbGenres = await Genres.findAll();

    // 3. Si no hay géneros en la DB, guardarlos desde la API
    if (dbGenres.length === 0) {
      await Genres.bulkCreate(
        apiGenres.map((g) => ({
          id: g.id,
          name: g.name,
        }))
      );
    }

    // 4. Obtener géneros de la DB
    const genres = await Genres.findAll();
    res.json(genres);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 };





module.exports = {
  getVideogamesById,
  getGameByName,
  getGenres,
};
