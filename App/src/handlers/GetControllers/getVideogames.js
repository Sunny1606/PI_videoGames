const router = require("../../routes");
const { Op } = require("sequelize");
const axios = require("axios");
require("dotenv").config();


const API_KEY = process.env.RAWG_API_KEY;
const { Videogame, Genres } = require("../../db");

//100 juegos desde la API
const getApiInfo = async () => {
  const apiGamesInfo = 5;
  
  const games = [];

  for (let i = 1; i <= apiGamesInfo; i++) {
    const { data } = await axios.get(`https://api.rawg.io/api/games`, {
      params: { key: API_KEY, page: i },
    });

    data.results.map((game) => {
      games.push({
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        image: game.background_image,
        rating: game.rating,
        platforms: game.platforms.map((e) => e.platform.name),
        genres: game.genres.map((e) => e.name),
      });
    });
  }

  return games;
};

//desde la base de datos
const getDBInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
    },
  });
};

//busco tanto en la api como en db 
const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  let bdInfo = await getDBInfo();

  bdInfo = bdInfo.map((e) => {
    return {
      id: e.dataValues.id,
      name: e.dataValues.name,
      description: e.dataValues.description,
      released: e.dataValues.released,
      rating: e.dataValues.rating,
      platforms: e.dataValues.platforms,
      image: e.dataValues.image,
      createdInDb: true,
      genres: e.dataValues.genres.map((e) => e.dataValues.name),
    };
  });

  const infoTotal = bdInfo.concat(apiInfo);

  return infoTotal;
};



//--------------------------------------------




const getVideogamesById = async (req, res) => {
  const { id } = req.params;

  if (id.length < 36) {
    try {
      var { data } = await axios.get(`https://api.rawg.io/api/games/${id}`, {
        params: { key: API_KEY },
      });
    } catch (error) {
      return res.status(404).send("ID invalido");
    }

    let platforms = data.platforms.map((e) => e.platform.name);
    let genres = data.genres.map((genre) => genre.name);

    let foundGame = {
      image: data.background_image,
      name: data.name,
      genres: genres,
      description: data.description_raw,
      released: data.released,
      rating: data.rating,
      platforms: platforms.join(", "),
    };

    return res.status(200).send(foundGame);
  }

  let gameDB = await Videogame.findOne({
    where: {
      id: id,
    },
    include: {
      model: Genres,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  let genres = gameDB.genres.map((genre) => genre.name);

  let foundGame = {
    image: gameDB.image,
    name: gameDB.name,
    genres: genres,
    description: gameDB.description,
    released: gameDB.released,
    rating: gameDB.rating,
    platforms: gameDB.platforms,
  };

  return res.status(200).send(foundGame);
};

//desde la API
const getGameByName = async (req,res) => {
  let { name } = req.query;

  try {
    if (name) {
      const infoByName = await getInfoByName(name);
      res.status(200).send(infoByName);
    } else {
      const allData = await getAllInfo();
      res.status(200).send(allData);
    }
  } catch (e) {
    res.status(404).send("Juego no encontrado");
  }
};

//desde la api por ID 
const getApiByName = async (name) => {
  const resAxios = await axios.get(`https://api.rawg.io/api/games`, {
    params: { key: API_KEY, search: name },
  });
  const results = resAxios.data.results;

  let response = results.map((result) => {
    return {
      id: result.id,
      name: result.name,
      released: result.released,
      image: result.background_image,
      rating: result.rating,
      platforms: result.platforms.map((e) => e.platform.name),
      genres: result.genres.map((e) => e.name),
    };
  });
  return response;
};
//desde la base de datos
const getDbByName = async (name) => {
  const DBInfo = await getDBInfo();
  const filtByName = await DBInfo.filter((games) =>
    games.name.toLowerCase().includes(name.toLowerCase())
  );
  return filtByName;
};

// busco tanto en API como en DB
const getInfoByName = async (name) => {
  const apiByName = await getApiByName(name);
  const DbByName = await getDbByName(name);
  const infoNameTotal = DbByName.concat(apiByName);
  return infoNameTotal;
};


module.exports = {
  getVideogamesById,
  getGameByName,
  getAllInfo,
};
