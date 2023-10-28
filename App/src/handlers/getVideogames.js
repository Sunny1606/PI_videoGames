const { Videogame, Genres } = require("../db");
const router = require("../routes");
const { Op } = require("sequelize");
const axios = require("axios");

//obtiene juegos por id
const getVideogamesById = async (req, res) => {
  try {
    const { id } = req.params;

    const apiKey = process.env.RAWG_API_KEY;
    const apiResponse = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${apiKey}`
    );
    const apiGame = apiResponse.data;

    if (apiGame) {
      res.json(apiGame);
    } else {
      const game = await Videogame.findByPk(id);

      if (game) {
        res.json(game);
      } else {
        res.status(404).send("Videogame no encontrado");
      }
    }
  } catch (error) {
    res.status(500).send("Hubo un error al obtener el detalle del videogame.");
  }
};

//obtiene por query {name}
const getGameByName = async (req, res) => {
  const apiKey = '95817a7e4a5b4f108f31cffdc2c8d8e1'; // Reemplaza con tu clave de API
  const apiUrl = 'https://api.rawg.io/api/games';

  try {
    const response = await axios.get(apiUrl, {
      params: {
        key: apiKey
      }
    });

    if (response.status === 200) {
      const data = response.data;
      res.json(data);
    
    } else {
      throw Error (`Error de respuesta HTTP: ${response.status}`);
    }
  } catch (error) {
    res.json("Hubo un error al obtener los datos:", error);
  }
};




// const getGameByName = async (req, res) => {
//   try {
//     const { name } = req.query;
    
//     const databaseResults = await Videogame.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${name}%`,
//         },
//       },
//       limit: 15,
//     });
//     const apiKey = process.env.RAWG_API_KEY;
//     const apiRes = await axios.get(
//       `https://api.rawg.io/api/games?key=${apiKey}&search=${name}&page_size=15`
//     );
    
//     const apiResults = apiRes.data.results;
//     console.log(apiResults);
//     const combinedResults = [...databaseResults, ...apiResults];

//     if (combinedResults.length > 0) {
//       res.json(combinedResults);
//     } else {
//       res.json({ message: "No se encontraron resultados" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Hubo un error al buscar el videojuego con ese nombre" });
//   }
// };

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
  getVideogamesById,
  getGameByName,
  getGenres,
};
