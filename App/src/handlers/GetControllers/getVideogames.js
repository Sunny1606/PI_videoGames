const router = require("../../routes");
const { Op } = require("sequelize");
const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.RAWG_API_KEY;
const { Videogame, Genres } = require("../../db");

const getVideogamesById = async (req, res) => {
  const { id } = req.params;
  try {
    // busco en la bdd si el id es uuid
    if (isNaN(id)) {
      const dbVideogame = await Videogame.findByPk(id, {
        include: {
          model: Genres,
          attributes: ["Genero"],
          through: { attributes: [] },
        },
      });
      const dbFiltered = {
        id: dbVideogame.ID,
        Nombre: dbVideogame.Nombre,
        Plataformas: dbVideogame.Plataformas,
        Descripcion: dbVideogame.Description,
        FechaLanzamiento: dbVideogame.FechaLanzamiento,
        Rating: dbVideogame.Rating,
        Generos: dbVideogame.Genres?.map((g) => g.Genero).join(", "),
        Imagen: dbVideogame.Imagen,
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
        Nombre: data.name,
        Plataformas: data.platforms?.map((p) => p.platform.name).join(", "),
        Descripcion: removeHTMLTags(data.description),
        FechaLanzamiento: data.released,
        Rating: data.rating,
        Generos: data.genres?.map((g) => g.name).join(", "),
        Imagen: data.background_image,
      };

      res.status(200).json(videogameByID);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGameByName = async (req, res) => {
  const API_URL = "https://api.rawg.io/api/games";

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
    const response = await axios.get(API_URL, {
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

