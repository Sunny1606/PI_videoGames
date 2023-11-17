
const { Videogame, Genres } = require("../../db");
const { Op } = require("sequelize");

const postVideogames = async (req, res) => {
  try {
    const { name, image, description, released, rating, platform, Genero } =
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
    const newVideogame = await Videogame.create({
      name,
      image,
      description,
      released,
      rating,
      platform,
    });
    // await newVideogame.addGenres(genres)
    // Genero.map(async (id ,name) => {
    //   let genresDB = await Genres.findAll({ where: { Genero: id , Genero: name } });
    //   await newVideogame.addGenre(genresDB);
    // });
    return res.status(201).json(newVideogame);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = postVideogames;

// const { Videogame, Genres } = require("../../db");

// const postVideogames = async (req, res) => {
//   const { name, description, plataforms, image, released, rating, Genero } =
//     req.body;

//   // const existingGame = await Videogame.findOne({
//   //   where: {
//   //     name: {
//   //       [Op.iLike]: name,
//   //     },
//   //   },
//   // });

//   // if (existingGame) {
//   //   throw new Error("El nombre del juego ya existe.");
//   // }

//   try {
//     const newVideogame = await Videogame.create({
//       name,
//       description,
//       plataforms,
//       image,
//       released,
//       rating,

//     });
//     Genero.forEach(async (g) => {
//       let genresDB = await Genres.findAll({ where: { Genero: g } });
//       await newVideogame.addGenre(genresDB);
//     });
//     res.status(201).json(newVideogame);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = postVideogames;
