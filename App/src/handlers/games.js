const express = require("express");
const axios = require("axios");
const { Videogame, Sequelize } = require("../models/Videogame"); 

const games = async (req, res) => {
  try {
    const URL = "https://api.rawg.io/api/";
    const RESULTS_PER_PAGE = 50;
    const { API_KEY } = process.env;
    const currentPage = req.query.page || 1;
    const searchQuery = req.query.searchQuery || "";

    
    const databaseResults = await Videogame.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${searchQuery}%`,
        },
      },
    });

    const apiResponse = await axios.get(
      `${URL}games?key=${API_KEY}&page=${currentPage}&page_size=${RESULTS_PER_PAGE}`
    );

    //mapea a los videogames con props especificas 
    const mappedGames = apiResponse.data.results.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      description: game.description,
      platforms: game.platforms.map((platform) => platform.platform.name),
      releaseDate: game.released,
      rating: game.rating,
      genres: game.genres.map((genre) => genre.name),
    }));

    res.json(mappedGames);

    // Combina la API con la Base de datos
    const allGames = [...databaseResults, ...mappedGames];

    res.json(allGames);
    
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos de juegos" });
  }
};

module.exports = games;
