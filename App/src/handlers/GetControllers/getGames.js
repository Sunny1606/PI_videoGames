require("dotenv").config();
const { Videogame, Genres } = require("../../db");
const axios = require("axios");

const URL = "https://api.rawg.io/api/";
const RESULTS_PER_PAGE = 50;
const MAX_RESULTS = 100;

const getGames = async (req, res) => {
  try {
    const data = await Videogame.findAll({
      include: {
        model: Genres,
      },
    });

    const allVideogamesDB = data.map((game) => {
      return game.dataValues;
    });

    const API_KEY = process.env.RAWG_API_KEY;
    let currentPage = 1;
    let totalResults = 0;
    let allGames = [];

    while (totalResults < MAX_RESULTS) {
      const apiResponse = await axios.get(
        `${URL}games?key=${API_KEY}&page=${currentPage}&page_size=${RESULTS_PER_PAGE}`
      );

      const games = apiResponse.data.results.map((game) => ({
        id: game.id,
        name: game.name,
        description: game.description,
        image: game.background_image,
        released: game.released,
        platforms: game.platforms.map((platform) => platform.platform.name),
        genres: game.genres.map((genre) => genre.name),
        rating: game.rating,
      }));

      allGames = [...allGames, ...games]; 
      totalResults += games.length;
      currentPage += 1;
    }

    allGames = [...allGames, ...allVideogamesDB];

    res.json(allGames);
    
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los videojuegos.");
  }
};

module.exports = getGames;
