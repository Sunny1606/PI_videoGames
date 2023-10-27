const router = require("../routes");
const { Videogame} = require("../db");
const { Router } = require("express");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

const postVideogames = async (req, res) => {
  try {
    const { name, image, description, date, rating , platform} = req.body;

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
    const newVideogame = await Videogame.create({
      name,
      image,
      description,
      date,
      rating,
      platform
    });

    return res.status(201).json(newVideogame);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = postVideogames;

//buscar en sequelize como es el datatype de DATE
