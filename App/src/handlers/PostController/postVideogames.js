
const { Videogame, Genres } = require("../../db");
const { Op } = require("sequelize");

const postVideogames = async (req, res) => {
  try {
    const { name, image, description, released, rating, platform, genres } =
      req.body;

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


    const newVideogames = await Videogame.create({
      name,
      image,
      description,
      released,
      rating,
      platform,
    });


    const allGenres = await Genres.findAll({
      where : {
        name :  genres , 
      }     
     })
  

     await newVideogames.setGenres(allGenres);
   
    return res.status(201).json(newVideogames);

  } catch (error) {
    return res.status(500).json(error.message);
  }
};



module.exports = postVideogames;

